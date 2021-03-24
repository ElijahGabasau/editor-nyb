const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const note = require('./routes/noteRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/note', note);

//if on server, serve react build from the client folder
//important! - check server's documentation for post-deploy build options 
//package.json contains script for heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//react client runs on 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT);