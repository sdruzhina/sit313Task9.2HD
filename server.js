const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const mongoose = require('mongoose');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const path = require('path');

// Routes and API
const authApi = require('./api/auth-api');
const requesterApi = require('./api/requester-api');
const config = require('./config');

// Passport configuration file
require('./config/passport');

const app = express()

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || config.mongoDB.uri, 
    {useNewUrlParser: true, useUnifiedTopology: true})

app.use(passport.initialize());
// app.use(passport.session());

// Initialise Passport strategies for requesters
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use(fileupload());
app.use('/auth', authApi);
app.use(requesterApi);

// Detect production environment and build client
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Send all requests to React router
app.get('/*', function(req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

let port = process.env.PORT;
if (port == null || port == '') {
  port = 8080;
}

app.listen(port, (req, res)=>{
    console.log('Server is running successfully on port ' + port);
})