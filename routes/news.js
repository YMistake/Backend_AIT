var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){
  console.log(req.body);
  var postdate = new Date();

  var data = {
    PostDate:  postdate,
    News: req.body.news,
    ToStudent: req.body.student,
    ToTeacher: req.body.teacher,
    ToCompany: req.body.company
  }

  connection.query('insert into Announcement set ?', data, function(err,rows){
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

  if(req.body.student == 1){
    var message = {
      app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
      contents: {"en": "[ข่าวใหม่]สำหรับนักศึกษา"},
      included_segments: ["All"]
    };
  } else if (req.body.teacher == 1){
    var message = {
      app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
      contents: {"en": "[ข่าวใหม่]สำหรับอาจารย์นิเทศก์"},
      included_segments: ["All"]
    };
  } else if (req.body.company == 1){
    var message = {
      app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
      contents: {"en": "[ข่าวใหม่]สำหรับสถานประกอบการ"},
      included_segments: ["All"]
    };
  } else if (req.body.student == 1 && req.body.teacher == 1){
    var message = {
      app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
      contents: {"en": "[ข่าวใหม่]สำหรับนักศึกษาและอาจารย์นิเทศก์"},
      included_segments: ["All"]
    };
  } else if (req.body.student == 1 && req.body.company == 1){
    var message = {
      app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
      contents: {"en": "[ข่าวใหม่]สำหรับนักศึกษาและสถานประกอบการ"},
      included_segments: ["All"]
    };
  } else if (req.body.teacher == 1 && req.body.company == 1){
    var message = {
      app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
      contents: {"en": "[ข่าวใหม่]สำหรับอาจารย์นิเทศก์และสถานประกอบการ"},
      included_segments: ["All"]
    };
  } else if (req.body.student == 1 && req.body.teacher == 1 && req.body.company == 1){
    var message = {
      app_id: "0ed8eb32-4000-4f4b-9217-3475c32fcbb5",
      contents: {"en": "[ข่าวใหม่]สำหรับผู้มีส่วนเกี่ยวข้องกับการฝึกงานอุตสาหกรรม"},
      included_segments: ["All"]
    };
  }

sendNotification(message);
})
module.exports = router;
