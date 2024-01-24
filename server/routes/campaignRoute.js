const router = require('express').Router();
const { validate } = require('uuid');
const campaignController = require('../controllers/campaignController')
const validateDto = require('../middleware/validate_dto')
const campaignSchema = require('../schema/campaign_update_schema')


router.get("/", campaignController.getCampaign)

router.post("/", campaignController.createCampaign)

router.delete("/", campaignController.deleteCampaign)

router.patch("/", validateDto(campaignSchema), campaignController.updateCampaign)

module.exports = router;