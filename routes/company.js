var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT distinct ApproveStatus.CID,CompanyName from ApproveStatus left join (Student , Company) on (ApproveStatus.SID = Student.SID and ApproveStatus.CID=Company.CID) WHERE AcademicYear = ? ORDER BY CompanyName DESC',req.body.year, function(err, rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      res.send({company: rows});
    }
  })

})
module.exports = router;
