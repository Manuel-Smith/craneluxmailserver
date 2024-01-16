const createCampaign = "INSERT INTO campaign (campaign_id, sender_email, sender_name, recipient, subject, body, sent_date, sent_time, campaign_type, campaign_goal, campaign_status, user_id, audience_id) VALUES ('a8a4l4l18llaihao38', 'riddicksmith37@gmail.com', 'Manuel Smith', 'cranelux.manuel@gmail.com', 'Test Email', 'This is a test email', '2024-01-16', '2024-01-16 19:23:00', 'Marketing', 'List Growth', 'Draft', '1', '567eaf02-d124-4862-b877-e19b21a3c6f0')"
const selectCampaigns = "SELECT * FROM campaign"
const selectOneCampaign = "SELECT * FROM campaign WHERE user_id = $1 AND campaign_id = $2"
const ifCampaignExists =  "SELECT * FROM campaign WHERE user_id = $1 AND campaign_id = $2"
module.exports = {createCampaign, selectCampaigns, selectOneCampaign, ifCampaignExists}