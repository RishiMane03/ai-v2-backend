const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const clc = require("cli-color");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const summarizeParagraph = require('./utils/summaryUtils');
require("dotenv").config();


// Variables
const app = express();
const port = process.env.PORT ;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); //this is used for form data
app.use(express.json()); // this is used for hitting req from anywhere like postman and converting client data to json
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/yo', (req, res) => {
    res.send('YO YO!');
});

// SUMMARY:
app.post('/summarize', async (req, res) => {
    console.log('summary api started')

    const { paragraph } = req.body;
    // console.log(paragraph);
    
    try {
        const summary = await summarizeParagraph(paragraph);
        res.send({ summary , tokenVerify : true });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log(clc.white.bgGreen.underline(`Server running on port http://localhost:${port}`));
});
