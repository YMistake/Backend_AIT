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

  connection.query('SELECT CAddress,CTel,SpvName,SpvPosition,SpvTel from student where CName = ? AND AcademicYear = ?',[req.body.CName,year], function(err, company){
    console.log(year);


    if (err){
      console.log(err);
      throw err;
    } else{
      connection.query('SELECT startup.Id,Firstname,Lastname,picture,CName,SPosition,STel from startup left join student on (startup.Id = student.Id) where CName = ?',req.body.CName,function(err,student){
        if (err){
          console.log(err);
          throw err;
        } else {
          res.send({CData: company ,SData: student});
        }
      })
    }
  })



})
module.exports = router;
