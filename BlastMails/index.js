const express = require('express');
const { connect } = require('amqplib')
const sendEmail = require('./sender')
require('dotenv').config();
const { error } = require('console');


const app = express();

async function consumeTestCampaigns() {

    const connection = await connect(process.env.RABBITMQ_NODE);
    const channel = await connection.createChannel();
    const queue = "testCampaign";
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (campaign) => {
      try {


        // Process campaign data efficiently
        sendEmail(campaign.content.toString());
        // console.log(campaign.content.toString());
        // ... additional processing tasks
  
        channel.ack(campaign); // Acknowledge after successful processing
      } catch (error) {
        console.error("Error processing message:", error);
        // Implement retry logic or handle errors gracefully
      }
    });
  }
  
  consumeTestCampaigns();

  async function consumeCampaigns() {
    const connection = await connect(process.env.RABBITMQ_NODE);
    const channel = await connection.createChannel();
    const queue = "campaigns";
    await channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (campaign) => {
      try {
        // Process campaign data efficiently
        console.log(campaign.content.toString());
        // ... additional processing tasks
  
        channel.ack(campaign); // Acknowledge after successful processing
      } catch (error) {
        console.error("Error processing message:", error);
        // Implement retry logic or handle errors gracefully
      }
    });
  }
  
  consumeCampaigns();

app.listen(4040, ()=>console.log("Listening on port 4040"));