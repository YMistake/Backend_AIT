var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT year from Admin where Indexs = 1', function(err,year){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('SELECT distinct CompanyName from ApproveStatus left join Student on ApproveStatus.SID = Student.SID where Status = 2 and AcademicYear = ?',year[0].year, function(err, rows){
        res.send({company: rows});
      })
    }
  })


})
module.exports = router;
