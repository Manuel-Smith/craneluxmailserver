const nodemailer = require('nodemailer');
require('dotenv').config();
const uuid = require('uuid');
const pool = require('./db');
const updateAnalytics = require('./updateAnalyticsModel')

const fs = require('fs/promises');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const sendMail = async (campaignData) =>{
    try {

        // Creating a new record for tracking emails
        const analyticsId = uuid.v4();


        // Validate and parse received message to JSON
        let jsonData;
        try {
            jsonData = JSON.parse(campaignData);

            const message = await fs.readFile('./message.html', 'utf-8');
            const trackingUrl = `${process.env.TRACKING_DOMAIN}?trackingId=${analyticsId}`
            const trackingPixel = `<img src="${trackingUrl}" alt="Email Open Tracking Pixel" width="1" height="1" style="display:none;">`
            const emailBodyWithTrackingPixel = `${message} ${trackingPixel}`
    
            // Creating a record to track the analytics for this particular user
            const trackAnalytics = await pool.query(updateAnalytics.createAudience, [analyticsId, jsonData.userId, jsonData.recipient, jsonData.campaignId]);
            if(trackAnalytics.command=='INSERT' && trackAnalytics.rowCount==1){
                console.log('Analytics Record Created')
            } else{
                console.log('Failed to create an analytic record');
            }
            
    
            const messageContent = {
                from: `"${jsonData.senderName}" <${jsonData.senderEmail}>`,
                to: jsonData.recipient,
                replyTo: jsonData.senderEmail,
                subject: jsonData.subject,
                html: emailBodyWithTrackingPixel
            };
            
            // Sending the message to the defined transporter.
            await transporter.sendMail(messageContent);

        } catch (error) {
            console.log(error);
            // throw new Error('Invalid JSON data');
        }
        
        // Uncomment for debugging
        
  
    } catch (error) {
        console.log("Error sending Email:", error.message);
        
    }
};

module.exports = sendMail;