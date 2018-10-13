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

var indexController = require('./controllers/index-controller');

indexController(app);

// server listening
var server = http.createServer(app).listen(3000,function () 
{
console.log('! ---------------------- Server is running on 3000 ---------------------- ! ');
});

