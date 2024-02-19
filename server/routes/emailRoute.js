const router = require('express').Router();
const emailController = require('../controllers/emailController')

router.put('/', emailController.sendEmail)


module.exports = router;