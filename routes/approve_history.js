var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res){
  connection.query('SELECT year from Admin where Indexs = 1',function(err,year){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('SELECT distinct CompanyName from ApproveStatus left join Student on (ApproveStatus.SID=Student.SID) where AcademicYear = ? and Status = 2',year[0].year,function(err,rows){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({data: rows});
          console.log(rows);
        }
      })

    }
  })

})
module.exports = router;
