var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  console.log(req.body.id);
  connection.query('SELECT year from Admin where Indexs = 1',function(err,year){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('SELECT CID FROM Supervisor WHERE ID = ?', req.body.id, function(err,cid){
        if(err){
          console.log(err);
          throw err;
        } else {
          connection.query('SELECT Student.ID,Picture,Firstname,Lastname,Major,Tel FROM Student left join (Startup,ApproveStatus) on (Startup.ID=Student.ID and Student.SID=ApproveStatus.SID) WHERE AcademicYear = ? AND CID = ?',[year[0].year,cid[0].CID], function(err,rows){
            if(err){
              console.log(err);
              throw err;
            } else {
              res.send({data: rows})
            }
          });
        }
      })
    }
  })

})
module.exports = router;
