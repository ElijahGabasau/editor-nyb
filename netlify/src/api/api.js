const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const note = require('./routes/noteRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/.netlify/functions/api/note', note);

module.exports.handler = serverless(app);