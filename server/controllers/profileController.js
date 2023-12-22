const pool = require('../db');
const profileQueries = require("../models/profileQueries")
const datetime = require('moment');

const getProfileById = async(req, res)=>{
    try {
        const id = req.params.id
        pool.query(profileQueries.getUserProfile, [id], (error, results)=>{

            console.log( `HTTP/1.1 method: ${req.method}, user-ipAddr: ${req.ip}, user-agent: ${req.headers['user-agent']}`)

            // Determining the age of the user.
            const date1 = new Date();
            const date2 = results.rows[0].date_of_birth;
        
            const diffInMilliseconds = date1.getTime() - date2.getTime();
            const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));

            
            res.status(200).json({
                "userId": results.rows[0].user_id,
                "names": {
                    "firstName": results.rows[0].first_name,
                    "lastName": results.rows[0].last_name,
                    "userName": results.rows[0].user_name
                },
                "email": results.rows[0].email_address,
                "phoneNumber": results.rows[0].phone_number,
                "location": {
                    "country": {
                        "countryCode": results.rows[0].country_code,
                        "countryName": results.rows[0].country_name,
                    },
                    "state": {
                        "stateCode": results.rows[0].state_code,
                        "stateName": results.rows[0].state_name,
                        "zipCode": results.rows[0].zip_code
                    },
                },
                "images": {
                    "profileImage": results.rows[0].profile_image,
                    "bannerImage": results.rows[0].banner_image
                },
                "socialMedia": {
                    "facebook": results.rows[0].facebook_page,
                    "linkedin": results.rows[0].linkedin_page,
                    "twitter": results.rows[0].twitter_page
                },
                "occupation": results.rows[0].occupation,
                "age": years,
                "userBio": results.rows[0].user_bio
            })
        })   
    } catch (error) {
        console.log(error);
    }
}
// Function for tracking and creating all the Profile.
// const createProfile = async(req, res)=>{

// }

// const deleteProfile = async(req, res)=>{

// }

// const updateProfile = async(req, res)=>{

// }

module.exports = {getProfileById}