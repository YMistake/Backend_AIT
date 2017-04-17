var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var query = connection.query('SELECT distinct Startup.ID,Firstname,Lastname,Picture,Recommend from Startup left join (Student, Review, ApproveStatus) on (Startup.ID=Student.ID and Startup.ID=Review.ID and Student.SID=ApproveStatus.SID) WHERE CompanyName = ? and AcademicYear = ?',[req.body.company,req.body.year], function(err, rows){
    console.log(err);
    console.log(rows);
    res.send({data: rows});
  })

})
module.exports = router;
