const router = require('express').Router();
const campaignController = require('../controllers/campaignController')


router.get("/", campaignController.getCampaign)

router.post("/", campaignController.createCampaign)

router.delete("/", async(req, res)=>{
})

router.patch("/", async(req, res)=>{
})

module.exports = router;