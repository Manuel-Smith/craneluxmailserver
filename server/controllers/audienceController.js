const audienceQueries = require('../models/audienceQueries')
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');
const { json } = require('body-parser');


const createAudience = async (req, res)=>{
    try {
        const newAudienceId = uuidv4();
        let userId=req.query.userId
        let audienceId=req.query.audienceId
        let description = req.body.description
        let audienceName = req.body.audienceName
        await pool.query(audienceQueries.ifAudienceExists, [userId, audienceId], (error, result)=>{
            if(result.rows.length > 0){
                res.status(409).json({
                    message: "Audience already exists"
                })
            } else {
                (async ()=>{
                    await pool.query(audienceQueries.insertAudience, [newAudienceId, description, userId, audienceName ], (error, result)=>{
                        res.status(201).json({
                            message: "Audience created successfully"
                        })
                    })
                })()
            }
        })
    } catch (error) {
        console.log(error.body)
    }
}

const getAudience = async (req, res)=>{
    try {
        let userId=req.query.userId
        let audienceId = req.query.audienceId
        if(userId && audienceId){
            await pool.query(audienceQueries.ifAudienceExists, [userId, audienceId], (error, result)=>{
                if(result.rows.length === 0){
                    res.status(409).json({
                        message: "This audience does not exist"
                    })
                } else {
                    (async ()=>{
                        await pool.query(audienceQueries.selectOneAudience, [userId, audienceId], (error, result)=>{
                            let responseJson = {
                                "userId": result.rows[0].user_id,
                                "audienceId": result.rows[0].audience_id,
                                "audienceName": result.rows[0].audience_name,
                                "description": result.rows[0].description
                            }
                            res.status(200).json(responseJson);
                        })
                        return;
                    })()
                }
            })


        } else if(userId){
            await pool.query(audienceQueries.selectAudience, [userId], (error, result)=>{
                let arrayLength = result.rows.length;
                let resultArray = new Array;
                if (arrayLength){
                    for(let i = 0; i < arrayLength; i++){
                        let responseJson = {
                            "userId": result.rows[i].user_id,
                            "audienceId": result.rows[i].audience_id,
                            "audienceName": result.rows[i].audience_name,
                            "description": result.rows[i].description
                        }
                        resultArray.push(responseJson);
                    }
                    res.status(200).json(resultArray);
                    return;
                } else {
                    res.status(409).json("No Audience available");
                    return;
                }
                
            })
        } else {
            console.log("This audience does not exist");
        }
    } catch (error) {
        console.log(error.body)
    }
}

const deleteAudience = async (req, res)=>{
    try {
        let userId=req.query.userId
        let audienceId=req.query.audienceId
        await pool.query(audienceQueries.ifAudienceExists, [userId, audienceId], (error, result)=>{
            if(result.rows.length === 0){
                res.status(409).json({
                    message: "This audience does not exist"
                })
            } else {
                (async ()=>{
                    await pool.query(audienceQueries.deleteAudience, [userId , audienceId], (error, result)=>{
                        res.status(200).json({
                            message: "Audience deleted successfully"
                        })
                    })
                })()
            }
        })
    } catch (error) {
        console.log(error.message);
    }

}

const updateAudience = async (req, res)=>{
    try {
        let userId=req.query.userId
        let audienceId=req.query.audienceId
        let audienceName=req.body.audienceName
        if(userId && audienceId){
            await pool.query(audienceQueries.ifAudienceExists, [userId, audienceId], (error, result)=>{
                if(result.rows.length === 0){
                    res.status(409).json({
                        message: "This audience does not exist"
                    })
                } else {
                    (async ()=>{
                        await pool.query(audienceQueries.updateAudience, [audienceName, audienceId, userId], (error, result)=>{
                            res.status(200).json({
                                message: "Audience updated successfully"
                            })
                        })
                    })()
                }
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
     createAudience, getAudience, deleteAudience, updateAudience
}