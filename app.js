var express = require('express');
var app = express();
var logger = require('morgan');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./connection.json');

var signup = require('./routes/signup');
var signupCompany = require('./routes/signup-company');
var signupCompany2 = require('./routes/signup-company2');
var review = require('./routes/review');
var record = require('./routes/record');
var CStudent = require('./routes/CStudent');
var SInformation = require('./routes/SInformation');
var scn = require('./routes/scn');
var scn2 = require('./routes/scn2');
var company = require('./routes/company');
var updateprofile = require('./routes/updateprofile');
var login = require('./routes/login');
var admin_login = require('./routes/admin-login');
var home = require('./routes/home');
var student_for_company = require('./routes/student-for-company');
var company_assesment = require('./routes/company-assesment');
var assign_company1 = require('./routes/assignCompany1');
// var tea_upprofile = require('./routes/tea_upprofile');
var select_company = require('./routes/select-company');
var teacher_supervision = require('./routes/teacher_supervision');
var teacher_supervision_company = require('./routes/teacher_supervision_company');
var teacher_supervision_company_assesment = require('./routes/teacher_supervision_company_assesment');
var news = require('./routes/news');
var approve = require('./routes/approve');
var confirm = require('./routes/approve_confirm');
var confirm_yes = require('./routes/approve_confirm_yes');
var confirm_no = require('./routes/approve_confirm_no');


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
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs'); // มันต้องตั้งเป็นอะไร งง !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
app.use('/sent-company', scn);
app.use('/sent-company-check', scn2);
app.use('/admin-login', admin_login);
app.use('/signup-company', signupCompany);
app.use('/signup-company2', signupCompany2);
app.use('/student-for-company', student_for_company);
app.use('/student-for-company/company-assesment', company_assesment);
app.use('/assign_company', assign_company1);
// app.use('/teacher-updateprofile', tea_upprofile);
app.use('/assign_company/select_company', select_company);
app.use('/teacher_supervision', teacher_supervision);
app.use('/teacher_supervision/company', teacher_supervision_company);
app.use('/teacher_supervision/company/Assesment', teacher_supervision_company_assesment);
app.use('/news', news);
app.use('/home', home);
app.use('/approve', approve);
app.use('/approve/confirm', confirm);
app.use('/approve/confirm/yes', confirm_yes);
app.use('/approve/confirm/no', confirm_no);


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
