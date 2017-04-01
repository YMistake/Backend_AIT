var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){
  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }

  var data = {
    Id: req.body.id,
    AcademicYear: year,
    CName: req.body.CName,
    _1: req.body._1,
    _2: req.body._2,
    _3: req.body._3,
    _4: req.body._4,
    _5: req.body._5,
    _6: req.body._6,
    _7: req.body._7,
    _8: req.body._8,
    _9: req.body._9,
    _10: req.body._10,
    _11: req.body._11,
    _12: req.body._12,
    _13: req.body._13,
    _14: req.body._14,
    _15: req.body._15,
    _16: req.body._16,
    _17: req.body._17,
    _18: req.body._18,
    _19: req.body._19,
    _20: req.body._20,
    Opinion: req.body.Opinion
  }
  connection.query('SELECT Id from teacher_assesment where Id = ? and AcademicYear = ?', [req.body.id,year], function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else if (rows.length) {
      connection.query('update teacher_assesment set ? where Id = ?',[data,data.Id],function(err){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({"report": "1"});
        }
      })
    } else if (!rows.length) {
      connection.query('insert into teacher_assesment set ?',data,function(err){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({"report": "1"});
        }
      })
    } else {
      res.send({"report": "0"});
    }
  });
})
module.exports = router;
