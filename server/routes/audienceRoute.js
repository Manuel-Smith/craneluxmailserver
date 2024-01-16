const audienceController = require('../controllers/audienceController')
const router = require('express').Router();

router.get("/", audienceController.getAudience)

router.post("/", audienceController.createAudience)

router.delete("/", audienceController.deleteAudience)

router.patch("/", audienceController.updateAudience)

module.exports = router;