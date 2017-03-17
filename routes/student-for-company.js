var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){
  var date = new Date();
  var year = date.getFullYear() + 542;
  var CName;
  console.log(req.body.id);
  connection.query('SELECT CName FROM supervisor WHERE Id = ?', req.body.id, function(err,cname){
    console.log("cname = " + cname);
    if(err){
      console.log(err);
      throw err;
    } else {
      CName = cname[0].CName;
      console.log(CName);
      console.log(year);
      connection.query('SELECT student.Id,picture,CName,Firstname,Lastname,Major,STel FROM student inner join startup on (startup.Id=student.Id) WHERE AcademicYear = ? AND CName = ?',[year,CName], function(err,rows){
        console.log(rows);
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({data: rows})
        }
      });
    }
  })
})
module.exports = router;
