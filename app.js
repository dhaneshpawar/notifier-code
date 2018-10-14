var http = require('http');

//express
var express = require('express');
var app = express();

const passport = require('passport');

//sign in with Google
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
app.use('/auth',authRoutes);

//BodyParser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

// ejs and static files
app.set('view engine','ejs');
app.use('/',express.static('./public'));

// requiring controllers for Databases
var usersDatabaseController = require('./controllers/database-controllers/users-database-controller');

// requiring controllers for webpages
var indexController = require('./controllers/index-controller');

// firing controllers
indexController(app);

//Mongodb
//To run mongoDB Database "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
//To run mongoDB Shell    "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"

// server listening
var server = http.createServer(app).listen(3000,function () 
{
console.log('! ---------------------- Server is running on 3000 ---------------------- ! ');
});

