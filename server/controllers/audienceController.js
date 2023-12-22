const audienceQueries = require('../models/audienceQueries')
const { v4: uuidv4 } = require('uuid');
const pool = require('../db')


const createAudience = async (req, res)=>{
    try {
        const newAudienceId = uuidv4();
        let userId=req.query.userId
        let audienceId=req.query.audienceId
        let description = req.body.description
        let audienceName = req.body.audience_name
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
        await pool.query(audienceQueries.selectAudience, [userId], (error, result)=>{
            res.status(200).json(result.rows);
        })
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
                    message: "This item does not exist"
                })
            } else {
                (async ()=>{
                    await pool.query(audienceQueries.deleteAudience, [userId , audienceId], (error, result)=>{
                        res.status(200).json({
                            message: "Item deleted successfully"
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
        let audienceName=req.body.audience_name
        console.log(audienceName);
        await pool.query(audienceQueries.ifAudienceExists, [userId, audienceId], (error, result)=>{
            if(result.rows.length === 0){
                res.status(409).json({
                    message: "This item does not exist"
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
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
     createAudience, getAudience, deleteAudience, updateAudience
}