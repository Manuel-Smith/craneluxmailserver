const openAndClickCounter = require('./openAndClickCounter');
const geoip = require('geoip-lite')
const pool = require('../db');
const analyticsQueries = require('../models/analyticsQueries')


const analyticsController = async (req, res)=>{
    try {
        const userAgentData = req.useragent
        const trackingId = req.query.trackingId

        //   Specific details about the user opening
          const deviceType = userAgentData.isMobile ? 'Mobile' : 'Desktop';
          const userAgent = userAgentData.source
          const userIpAddress = req.ip
          const lastTimeOpenned = new Date();
          const trackOpenCount = await openAndClickCounter.openCount(trackingId)
          const trackClickCounts = await openAndClickCounter.clickCount();
          const location = geoip.lookup(userIpAddress);
          const userCountry = `${location.country}`
          const userCity = `${location.city}`
          const userTimezone = `${location.timezone}`
          const userRegion = `${location.region}`
          console.log(lastTimeOpenned)
        

          // Updating the rows
          await pool.query(analyticsQueries.updateAnalyticsOnOpen,
            [
                trackOpenCount,
                lastTimeOpenned,
                userIpAddress,
                deviceType,
                userCountry,
                userCity,
                userTimezone,
                userRegion,
                userAgent,
                trackingId
            ]);

          res.status(200).send("Message reached");            
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Internal server error"})

    }

}

module.exports = analyticsController;