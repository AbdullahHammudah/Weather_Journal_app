// Setup empty JS object to act as endpoint for all routes
projectData = {};
let port = 8000;

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port,()=>{console.log(`Your port is : ${port}`)})

app.post('/savingData',(req, res)=>{
    projectData.temp = req.body.temprature;
    projectData.date = req.body.date;
    projectData.feelings = req.body.user_data;

    res.send(projectData);
    console.log(projectData);
})

app.get('/userData',(req, res)=>{
    res.send(projectData);
    res.end();
})