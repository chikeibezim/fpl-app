const express = require("express");
const https = require('https');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./models/User.js');

const User = mongoose.model('user');


const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function(error){
    if(error) console.log(error);
    console.log("connection successful");
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
		keys: [keys.cookieKey]
  })
)

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


app.get('/live', (req, res) => {

  https.get('https://fantasy.premierleague.com/api/element-summary/4/', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    res.send(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

});


if (process.env.NODE_ENV === "production") {
   // Express will serve up projection assets
   //like main.js file or main.css file
   app.use(express.static('client/build'));


   //Express will serve up up index.html file
   //if it doesnt recognize the route
   const path = require('path');
   app.get('*', (req, res) => {
   	 res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
