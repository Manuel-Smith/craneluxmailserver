const router = require('express').Router();
const profileController = require("../controllers/profileController")


router.get("/:id", profileController.getProfileById)

// router.post("/", profileController.createProfile)

// router.delete("/", profileController.deleteProfile)

// router.patch("/", profileController.updateProfile)


module.exports = router;