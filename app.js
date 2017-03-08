var express = require('express');
var app = express();
var logger = require('morgan');
var session  = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./connection.json');
var signup = require('./routes/signup');
var review = require('./routes/review');
var record = require('./routes/record');
var CStudent = require('./routes/CStudent');
var SInformation = require('./routes/SInformation');
var company = require('./routes/company');
var updateprofile = require('./routes/updateprofile');
var login = require('./routes/login');
var home = require('./routes/home');

require('./config/passport')(passport);

//เรียกใช้ mysql เชื่อมต่อกับฐานข้อมูล
var mysql = require('mysql');
var connection = mysql.createConnection(config);

//ทำการเชื่อมต่อกับฐานข้อมูล
connection.connect(function(err, results) {
    if (err) {
        console.log("ERROR: " + err.message);
        throw err;
    } else
    console.log("connected.");
});


app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'aitalwaysrunning',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // มันต้องตั้งเป็นอะไร งง !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
})
// require('./routes/routes.js');
app.use('/signup', signup);
app.use('/updateprofile', updateprofile);
app.use('/login', login);
app.use('/login/home', home);
app.use('/review', review);
app.use('/record', record);
app.use('/record/company', company);
app.use('/record/company/student', CStudent);
app.use('/record/company/student/information', SInformation);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, function(){
  console.log('Listen on port 3000');
});

module.exports = app;
