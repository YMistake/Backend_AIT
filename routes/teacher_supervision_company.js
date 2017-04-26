var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT CompanyAddress,CompanyTels from Company where CID = ?',req.body.CID, function(err, company){
    if (err){
      console.log(err);
      throw err;
    } else{
      connection.query('Select Firstname,Lastname,Position,Tel from Startup left join Supervisor on (Startup.ID = Supervisor.ID) where CID = ?',req.body.CID,function(err,spv){
        if(err){
          console.log(err);
          throw err;
        } else {
          connection.query('Select Startup.ID,Firstname,Lastname,Picture,Facebook,Line,Major,Tel from Startup left join (Student,ApproveStatus) on (Startup.ID = Student.ID and Student.SID=ApproveStatus.SID) where CID = ?',req.body.CID, function(err,std){
            if(err){
              console.log(err);
              throw err;
            } else {
              res.send({CData: company, SpvData: spv, StdData: std})
            }
          })
        }
      })
    }
  })
})
module.exports = router;
