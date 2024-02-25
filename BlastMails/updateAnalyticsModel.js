const createAudience = `INSERT INTO analytics (analytics_id, user_id, email_address, campaign_id)
                        VALUES($1, $2, $3, $4)`

module.exports = {createAudience}