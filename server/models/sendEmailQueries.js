const selectCampaigns = "SELECT * FROM campaigns WHERE user_id = $1 AND campaign_id = $2"
const selectSubscribers = "SELECT GET_SUBSCRIBER('1', '567eaf02-d124-4862-b877-e19b21a3c6f0')"

module.exports = {selectCampaigns, selectSubscribers}