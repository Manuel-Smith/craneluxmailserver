const pool = require('../db')
const campaignQueries = require('../models/campaignQueries')
const { v4: uuidv4 } = require('uuid');

const createCampaign = async(req, res)=>{
    try {
        const newId = uuidv4();
        pool.query(campaignQueries.createCampaign, (error, result)=>{
            const campaignBody = {...req.body, campaignId: newId}
    
            res.status(200).json(campaignBody);
        })   
    } catch (error) {
        console.log(error);
    }
}


const getCampaign = async (req, res)=>{
    try {
        let userId = req.query.userId;
        let campaignId = req.query.campaignId;

        if(userId && campaignId){
            pool.query(campaignQueries.ifCampaignExists, [userId, campaignId], (error, result)=>{
                if(result.rows.length > 0){
                    pool.query(campaignQueries.selectOneCampaign, [userId, campaignId], (error, result)=>{
                        res.status(200).json(
                            {
                                campaignId: result.rows[0].campaign_id,
                                senderEmail: result.rows[0].sender_email,
                                senderName: result.rows[0].sender_name,
                                recipient: result.rows[0].recipient,
                                subject: result.rows[0].subject,
                                body: result.rows[0].body,
                                dateSent: result.rows[0].sent_date,
                                timeSent: result.rows[0].sent_time,
                                campaignType: result.rows[0].campaign_type,
                                campaignGoal: result.rows[0].campaign_goal,
                                campaignStatus: result.rows[0].campaign_status,
                                userId: result.rows[0].user_id,
                                audienceId: result.rows[0].audience_id,
                            }
                        );
                    })
                } else {
                    res.status(409).json("This Campaign does not exist");
                }
            })
        } else if (userId){
            let campaignArray = new Array;
            pool.query(campaignQueries.selectCampaigns, (error, result)=>{
                let campaignsRowLength = result.rows.length;
                for(let i = 0; i < campaignsRowLength; i++) {
                    
                    campaignArray.push(
                        {
                            campaignId: result.rows[i].campaign_id,
                            senderEmail: result.rows[i].sender_email,
                            senderName: result.rows[i].sender_name,
                            recipient: result.rows[i].recipient,
                            subject: result.rows[i].subject,
                            body: result.rows[i].body,
                            dateSent: result.rows[i].sent_date,
                            timeSent: result.rows[i].sent_time,
                            campaignType: result.rows[i].campaign_type,
                            campaignGoal: result.rows[i].campaign_goal,
                            campaignStatus: result.rows[i].campaign_status,
                            userId: result.rows[i].user_id,
                            audienceId: result.rows[i].audience_id,
                        }
                    )
                }
                res.status(200).json(campaignArray);
            })
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createCampaign, getCampaign
}