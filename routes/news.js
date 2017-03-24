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


  var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic MGY4YjcxZDItZmUzZC00ZTE1LThmOWUtM2YyNjljNzc5MTE5"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

var message = {
  app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
  contents: {"en": "มีข่าวใหม่"},
  included_segments: ["All"]
};

sendNotification(message);
})
module.exports = router;
