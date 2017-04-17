var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var query = connection.query('SELECT distinct CompanyName from ApproveStatus left join Student on (ApproveStatus.SID = Student.SID) WHERE AcademicYear = ? ORDER BY CompanyName DESC',req.body.year, function(err, rows){
    console.log(err);
    console.log(rows);

    res.send({company: rows});
  })

})
module.exports = router;
