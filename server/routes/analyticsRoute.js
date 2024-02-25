const router = require('express').Router();
const ua = require('express-useragent');
const analyticsController = require('../controllers/analyticsController');


router.use(ua.express());

router.get('/', analyticsController);

module.exports = router;