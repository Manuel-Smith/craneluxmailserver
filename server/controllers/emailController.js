const pool = require('../db'); // Assuming connection pooling is implemented
const mailQueries = require("../models/sendEmailQueries");
const { Readable, Writable } = require('stream');
const { error } = require('console');
const { connect } = require('amqplib')
require('dotenv').config();


async function createReadableStream() {
  try {
    const queryResult = await pool.query(mailQueries.selectSubscribers);
    return Readable({
      objectMode: true,
      read() {
        for (const row of queryResult.rows) {
          // Transforming rows queried from the database.
          let splitString = row.get_subscriber.split("");
          splitString.splice(-11, 10)
          try {
            this.push(splitString.join(""));
          } catch (err) {
            this.emit('error', err);
          }
        }
        this.push(null); // Signal end of stream
      },
    });
  } catch (err) {
    throw err; // Propagate error for proper handling
  }
}

function createWritableStream(userId, campaignId) {
  return Writable({
    objectMode: true,
    async write(chunk, encoding, callback) {
        const campaign_result = await pool.query(mailQueries.selectCampaigns, [userId, campaignId])
        const row = campaign_result.rows[0]
        let splitEmail = chunk.split('')
        splitEmail.splice(-1, 1)
        splitEmail.splice(0, 1)
        const campaignData = {
            campaignId: row.campaign_id,
            senderEmail: row.sender_email,
            senderName: row.sender_name,
            recipient: splitEmail.join(""),
            subject: row.subject,
            body: row.body,
            sentDate: null,
            sentTime: null,
            campaignType: row.campaign_type,
            campaignGoal: row.campaign_goal,
            campaignStatus: row.campaign_status,
            userId: row.user_id
            }

      // Handle data (e.g., send email)
      try {
        // Send email or perform other actions
        // ...

            const connection = await connect(process.env.pro);
            const channel = await connection.createChannel();
            const buffer = Buffer.from(JSON.stringify(campaignData));
            const queue = 'campaigns'
    
            await channel.assertQueue(queue, {durable: false})
            channel.sendToQueue(queue, buffer);
            await channel.close();
      } catch (err) {
        console.error('Error processing chunk:', err);
        // Handle errors appropriately (e.g., log, retry, inform caller)
      }

      callback();
    },
  });
}

async function sendEmail(req, res) {
  try {
    let action = req.query.action
    let userId = req.body.userId
    let campaignId = req.body.campaignId
    let testEmail = req.body.testEmail
    const readableStream = await createReadableStream(process.env.HAPROXY_VIRTUAL_IP_AND_PORT);
    const writableStream = createWritableStream(userId, campaignId);

    if(action=='send'){
      /**
       * Update the database the time the campaign was sent. So, I must write sql queries in this section
       * 
       */
        readableStream.pipe(writableStream);
    }

    if(action=='test'){
        const campaign_result = await pool.query(mailQueries.selectCampaigns, [userId, campaignId])
        const row = campaign_result.rows[0]
        const campaignData = {
            campaignId: row.campaign_id,
            senderEmail: row.sender_email,
            senderName: row.sender_name,
            recipient: testEmail,
            subject: row.subject,
            body: row.body,
            sentDate: null,
            sentTime: null,
            campaignType: row.campaign_type,
            campaignGoal: row.campaign_goal,
            campaignStatus: row.campaign_status,
            userId: row.user_id
            }

            const connection = await connect(process.env.HAPROXY_VIRTUAL_IP_AND_PORT);
            const channel = await connection.createChannel();
            const buffer = Buffer.from(JSON.stringify(campaignData));
            const queue = 'testCampaign'
    
            await channel.assertQueue(queue, {durable: false})
            channel.sendToQueue(queue, buffer);

            await channel.close();
        res.status(200).json({message: "Done Sending The Test Email. Check your inbox"})
        
    }

    readableStream.on('error', (err) => {
      // Handle stream errors (e.g., database or connection issues)
      console.error('Readable stream error:', err);
      // ...
    });

    writableStream.on('error', (err) => {
      // Handle writable stream errors (e.g., cannot write to output)
      console.error('Writable stream error:', err);
      // ...
    });

    readableStream.on('finish', () => {
      // Data finished writing
      console.log('Finished sending emails (or processing data)');
      // ...
    });

    writableStream.on('finish', ()=>{
    // Consider closing the writable stream manually if needed
    writableStream.end();
    console.log("Finished sending emails to rabbitmq")
    res.status(200).json({
        message: "Finished sending the campaign to the emails"
    })
    })
  } catch (err) {
    // Handle overall errors
    console.error('Error sending emails:', err);
    res.status(500).json({error: "Internal server error"})
  }
}

module.exports = { sendEmail };