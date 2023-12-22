const insertAudience = " INSERT INTO audience (audience_id, description, user_id, audience_name) VALUES ($1, $2, $3, $4)"
const selectAudience = "SELECT * FROM audience WHERE user_id = $1"
const ifAudienceExists = "SELECT * FROM audience WHERE user_id = $1 AND audience_id = $2"
const deleteAudience = "DELETE FROM audience WHERE user_id = $1 AND audience_id = $2"
const updateAudience = "UPDATE audience SET audience_name= $1 WHERE audience_id= $2 AND user_id= $3"

module.exports = {insertAudience, selectAudience, deleteAudience, ifAudienceExists, updateAudience}