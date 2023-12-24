const router = require('express').Router();
const profileController = require("../controllers/profileController")


router.get("/", async (req, res)=>{
    res.send(`SQL injection detected:`)
})

// router.post("/", profileController.createProfile)

// router.delete("/", profileController.deleteProfile)

// router.patch("/", profileController.updateProfile)


module.exports = router;