const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./model/user');
require('./model/Survey');
require('./service/passport');
mongoose.connect(keys.mongoURI);

const app = express();

//middleware
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 30 * 60 * 60 * 100,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/OAuthRoutes')(app);
require('./routes/billingRoute')(app);
require('./routes/surveyRoute')(app);

app.listen(5000);
