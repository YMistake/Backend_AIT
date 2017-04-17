var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res) {

  role = req.body.role;
  if(role == "student"){
    connection.query('SELECT CONVERT_TZ(PostDate,"+00:00","+07:00") as PostDate,News from Announcement where ToStudent = 1 ORDER by PostDate desc', function(err,rows){
      if(err){
        console.log(err);
        throw err;
      } else {
        res.send({news: rows})
      }
    })
  } else if (role == "teacher"){
    connection.query('SELECT CONVERT_TZ(PostDate,"+00:00","+07:00") as PostDate,News from Announcement where ToTeacher = 1 ORDER by PostDate desc', function(err,rows){
      if(err){
        console.log(err);
        throw err;
      } else {
        res.send({news: rows})
      }
    })
  } else if (role == "company"){
    connection.query('SELECT CONVERT_TZ(PostDate,"+00:00","+07:00") as PostDate,News from Announcement where ToCompany = 1 ORDER by PostDate desc', function(err,rows){
      if(err){
        console.log(err);
        throw err;
      } else {
        res.send({news: rows})
      }
    })
  } else {
    console.log("Admin");
  }
});

module.exports = router;
