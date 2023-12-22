const getUserProfile = "SELECT users.user_id, users.first_name, users.last_name, users.user_name, users.email_address, users.phone_number, users.location_id, users.profile_image, country.country_name, users.facebook_page, users.twitter_page, users.linkedin_page, users.banner_image, users.occupation, users.date_of_birth, users.user_bio, location.country_code, location.state_code, location.zip_code, state.state_name FROM users INNER JOIN location ON users.location_id = location.location_id INNER JOIN country ON location.country_code = country.country_code INNER JOIN state ON state.state_code = location.state_code WHERE users.user_id = $1;";
const insertEmailsIntoDataBase = "INSERT INTO subscribers (audience_id, user_id, subscribed, subscription_media, email_address) VALUES('1', '1', FALSE, 'Imported List', $1)";
const checkIfEmailExists = "SELECT * FROM subscribers WHERE email_address= $1" 
module.exports = {getUserProfile, insertEmailsIntoDataBase, checkIfEmailExists}

