const pool = require('../db')
const campaignQueries = require('../models/campaignQueries')
const { v4: uuidv4 } = require('uuid');




const createCampaign = async(req, res)=>{
    try {
        const userId = req.query.userId;
        const newId = uuidv4();
        const requestBody = req.body;

        if(userId){
            const result = await pool.query(
                campaignQueries.createCampaign,
                [
                    newId,
                    requestBody.senderEmail,
                    requestBody.senderName,
                    requestBody.recipient,
                    requestBody.subject,
                    requestBody.body,
                    requestBody.campaignType,
                    requestBody.campaignGoal,
                    requestBody.campaignStatus,
                    requestBody.userId,
                    requestBody.audienceId
                ])
            
            const campaignBody = {campaignId: newId, ...req.body};
            res.status(201).json(campaignBody); 
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


const getCampaign = async (req, res)=>{
    try {
        let userId = req.query.userId;
        let campaignId = req.query.campaignId;
        const pageSize = 10;
        const pageNumber = req.body.page
        const offSet = (pageNumber-1)*pageSize

        if(userId && campaignId){

            const result = await pool.query(campaignQueries.selectOneCampaign, [userId, campaignId]);

            if(result.rows.length > 0){
                let campaign = result.rows[0];
                res.status(200).json({
                    campaignId: campaign.campaign_id,
                    senderEmail: campaign.sender_email,
                    senderName: campaign.sender_name,
                    recipient: campaign.recipient,
                    subject: campaign.subject,
                    body: campaign.body,
                    dateSent: campaign.sent_date,
                    timeSent: campaign.sent_time,
                    campaignType: campaign.campaign_type,
                    campaignGoal: campaign.campaign_goal,
                    campaignStatus: campaign.campaign_status,
                    userId: campaign.user_id,
                    audienceId: campaign.audience_id,
                })
            } else{
                res.status(409).send("This Campaign does not exist");
            }
        } else if (userId){
            let campaignArray = new Array;
            const result = await pool.query(campaignQueries.selectCampaigns, [pageSize, offSet])
            let campaignsRowLength = result.rows.length;

            if(campaignsRowLength > 0){
                const campaigns = result.rows.map((campaign)=>{
                    return {
                        campaignId: campaign.campaign_id,
                        senderEmail: campaign.sender_email,
                        senderName: campaign.sender_name,
                        recipient: campaign.recipient,
                        subject: campaign.subject,
                        body: campaign.body,
                        dateSent: campaign.sent_date,
                        timeSent: campaign.sent_time,
                        campaignType: campaign.campaign_type,
                        campaignGoal: campaign.campaign_goal,
                        campaignStatus: campaign.campaign_status,
                        userId: campaign.user_id,
                        audienceId: campaign.audience_id, 
                    }
                });

                res.status(200).json(campaigns);
            } else{
                res.status(409).json("There are no Campaigns Available");
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
}

const deleteCampaign = async (req, res)=>{
    try {
        let campaignId = req.query.campaignId
        let userId = req.query.userId

        if(userId && campaignId){
            console.log(`UserId: ${userId}, campaignId: ${campaignId}`)
            const doesEmailExist = await pool.query(campaignQueries.ifCampaignExists, [userId, campaignId]);
            if(doesEmailExist.rows.length <= 0){
                res.status(409).send("This campaign does not exist");
                return;
            }
        }

        await pool.query(campaignQueries.deleteCampaign, [campaignId])
        res.status(201).send("Campaign deleted successfully");

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
}

const updateCampaign = async (req, res)=>{
    try {
        const userId = req.query.userId;
        const requestBody = req.body;
        const campaignId = requestBody.campaignId;
    
        if(userId && campaignId){
            const doesEmailExist = await pool.query(campaignQueries.ifCampaignExists, [userId, campaignId]);
            if(doesEmailExist.rows.length <= 0){
                res.status(409).send("This campaign does not exist");
                return;
            }
            
            await pool.query(campaignQueries.updateCampaign, [
                requestBody.senderEmail,
                requestBody.senderName,
                requestBody.recipient,
                requestBody.subject,
                requestBody.body,
                requestBody.campaignType,
                requestBody.campaignGoal,
                requestBody.campaignStatus,
                requestBody.campaignId
            ]);

            res.status(201).send("Campaign Updated successfully");
        }
    } catch (error) {
        if(error instanceof SyntaxError && error.status == 400){
            res.status(400).json({error: "Malformed JSON in request body"})
        }else {
            console.log(error);
            res.status(500).json({error: "Internal server error"})
        }
    }
    
}
module.exports = {
    createCampaign, getCampaign, deleteCampaign, updateCampaign
}