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
      connection.query('SELECT distinct CompanyName,ApproveStatus.CID,Submitter from ApproveStatus left join (Student, Company) on (ApproveStatus.SID=Student.SID and ApproveStatus.CID=Company.CID) where AcademicYear = ? and Status = 2',year[0].year,function(err,approve){
        if(err){
          console.log(err);
          throw err;
        } else {
          connection.query('SELECT distinct CompanyName,ApproveStatus.CID,Submitter from ApproveStatus left join (Student, Company) on (ApproveStatus.SID=Student.SID and ApproveStatus.CID=Company.CID) where AcademicYear = ? and Status = 3',year[0].year,function(err,disapprove){
            if(err){
              console.log(err);
              throw err;
            } else {
              res.send({approve: approve, disapprove: disapprove});
            }
          });
        }
      })

    }
  })

})
module.exports = router;
