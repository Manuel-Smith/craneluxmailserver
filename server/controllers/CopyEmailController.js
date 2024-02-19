const { error } = require('ajv/dist/vocabularies/applicator/dependencies');
const pool = require('../db')
const emailQueries = require('../models/sendEmailQueries')
const QueryStream = require('pg-query-stream')


const sendEmail = async (req, res)=>{
    try {
        const userId = "1";
        const campaignId = req.body.campaignId;
        let audienceId = '567eaf02-d124-4862-b877-e19b21a3c6f0'
        // const message = "This is the man that ate the rabbit";
        // let audienceId;
        
        // Retrieving the campaign to be sent to from the database
        // const campaign = await pool.query(emailQueries.selectCampaigns, [userId, campaignId])

        // let campaignArray = campaign.rows.map((row) => {
        //     audienceId = row.audience_id
        //     return {
        //         campaignId: row.campaign_id,
        //         senderEmail: row.sender_email,
        //         senderName: row.sender_name,
        //         recipient: row.recipient,
        //         subject: row.subject,
        //         body: row.body,
        //         campaignType: row.campaign_type,
        //         campaignGoal: row.campaign_goal,
        //         campaignStatus: row.campaign_status,
        //         userId: row.user_id,
        //         audienceId: row.audience_id
        //     }
        // });

        const query = new QueryStream(emailQueries.selectSubscribers)
        const stream = pool.query(query)
        console.log(emailQueries.selectSubscribers)

        stream.on('error', (error)=>{
            console.log("Error!: ", error);
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {sendEmail};