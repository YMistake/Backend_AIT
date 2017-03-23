var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){
  console.log(req.body);
  var postday = new Date();
  var year = postday.getFullYear() + 543;
  var month = postday.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }

  var data = {
    AcademicYear: year,
    PostDay:  postday,
    News: req.body.news,
    student: req.body.student,
    teacher: req.body.teacher,
    company: req.body.company
  }

  connection.query('insert into news set ?', data, function(err,rows){
    console.log(postday);
    if (err){
      console.log(err);
      throw err;
    } else {
      res.send({report: "1"})
    }
  })
})
module.exports = router;
