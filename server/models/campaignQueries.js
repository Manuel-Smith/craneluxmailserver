const createCampaign = `INSERT INTO campaigns (
                            campaign_id,
                            sender_email,
                            sender_name,
                            recipient,
                            subject,
                            body,
                            campaign_type,
                            campaign_goal,
                            campaign_status,
                            user_id,
                            audience_id)
                        VALUES (
                            $1,
                            $2,
                            $3,
                            $4,
                            $5,
                            $6,
                            $7,
                            $8,
                            $9,
                            $10,
                            $11)`


const selectCampaigns = "SELECT * FROM campaigns LIMIT $1 OFFSET $2"


const selectOneCampaign = `SELECT * FROM campaigns
                                WHERE user_id = $1
                                AND campaign_id = $2`


const ifCampaignExists =  `SELECT * FROM campaigns
                                WHERE user_id = $1
                                AND campaign_id = $2`


const deleteCampaign = `DELETE FROM campaigns
                            WHERE campaign_id = $1`


const updateCampaign = `UPDATE campaigns SET
                            sender_email = $1,
                            sender_name = $2,
                            recipient = $3,
                            subject = $4,
                            body = $5,
                            campaign_type = $6,
                            campaign_goal = $7,
                            campaign_status = $8
                        WHERE
                            campaign_id = $9
                                `


module.exports = {createCampaign, selectCampaigns, selectOneCampaign, ifCampaignExists, deleteCampaign, updateCampaign}