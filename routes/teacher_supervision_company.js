var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT CompanyAddress,CompanyTels from Company where CompanyName = ?',req.body.CompanyName, function(err, company){
    if (err){
      console.log(err);
      throw err;
    } else{
      connection.query('Select Firstname,Lastname,Position,Tel from Startup left join Supervisor on (Startup.ID = Supervisor.ID) where CompanyName = ?',req.body.CompanyName,function(err,spv){
        if(err){
          console.log(err);
          throw err;
        } else {
          connection.query('Select Startup.ID,Firstname,Lastname,Picture,Facebook,Line,Major,Tel from Startup left join (Student,ApproveStatus) on (Startup.ID = Student.ID and Student.SID=ApproveStatus.SID) where CompanyName = ?',req.body.CompanyName, function(err,std){
            if(err){
              console.log(err);
              throw err;
            } else {
              console.log("CData - "+company);
              console.log("SpvData - "+ spv);
              console.log("StdData - "+ std);
              res.send({CData: company, SpvData: spv, StdData: std})
            }
          })
        }
      })
    }
  })
})
module.exports = router;
