const express = require('express');
const fs = require('fs')
const {v4: uuid} = require('uuid')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors());
require('dotenv').config();
let jsonBodyParser = bodyParser.json();


// Importing Routes
const audienceRoute = require('./routes/audienceRoute');
const campaignRoute = require('./routes/campaignRoute');
// const trackRoute = require('./routes/tracking');
// const settingsRoute = require('./routes/settingsRoute');
const profileRoute = require('./routes/profileRoute');
const loginRoute = require('./routes/loginRoute')
const subscribersRoute = require('./routes/subscribersRoute');
const emailRoute = require('./routes/emailRoute');
const analyticsRoute = require('./routes/analyticsRoute');


const PORT = process.env.PORT;


// Route for the home page.
app.get("/", (req, res)=>{
    fs.readFile('./served.json', 'utf8', (error, data)=>{
        // res.json("JSON.parse(data)")
        res.status(200).json(`Hello there, your new id is: ${newID}`)
    })
})

// Middleware to serve json files
app.use("/audience", jsonBodyParser, audienceRoute);
app.use("/campaign", jsonBodyParser, campaignRoute);
app.use("/mail", jsonBodyParser, emailRoute);
// app.use("/settings", settingsRoute);
app.use("/profile", jsonBodyParser, profileRoute);
app.use("/subscribers", jsonBodyParser, subscribersRoute);
app.use("/login", jsonBodyParser, loginRoute);
app.use("/track", jsonBodyParser, analyticsRoute);

app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`));