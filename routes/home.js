var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res) {
  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }

  role = req.body.role;
  if(role == "student"){
    connection.query('SELECT CONVERT_TZ(PostDay,"+00:00","+07:00") as PostDay,News from news where AcademicYear = ? and student = 1',year, function(err,rows){
      if(err){
        console.log(err);
        throw err;
      } else {
        res.send({news: rows})
      }
    })
  } else if (role == "teacher"){
    connection.query('SELECT CONVERT_TZ(PostDay,"+00:00","+07:00") as PostDay,News from news where AcademicYear = ? and teacher = 1',year, function(err,rows){
      if(err){
        console.log(err);
        throw err;
      } else {
        res.send({news: rows})
      }
    })
  } else if (role == "company"){
    connection.query('SELECT CONVERT_TZ(PostDay,"+00:00","+07:00") as PostDay,News from news where AcademicYear = ? and company = 1',year, function(err,rows){
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
