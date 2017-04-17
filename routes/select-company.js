var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res){

  connection.query('SELECT year from Admin where Indexs = 1', function(err,year){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('SELECT distinct CompanyName from ApproveStatus inner join Student on (ApproveStatus.SID = Student.SID) where Status = 2 AND AcademicYear = ?', year[0].year, function(err,rows){
        res.send({company: rows});
      })
    }
  })
})

router.post('/', function(req, res){

  connection.query('SELECT 1 from TeacherAssignment WHERE ID = ?', req.body.id, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else if(rows.length) {
      connection.query('delete from TeacherAssignment where ID = ?', req.body.id, function(err){
        if(err){
          console.log(err);
          throw err;
        } else {
          for (var i =0, len = req.body.company.length; i < len; i++){
            var data = {
              ID: req.body.id,
              CompanyName: req.body.company[i]
            }
              connection.query('insert into TeacherAssignment set ?', data, function(err,rows){
                if (err){
                  console.log(err);
                  throw err;
                }
              })
          }
          res.send({"report": "1"});
        }
      })
    } else {
      for (var i =0, len = req.body.company.length; i < len; i++){
        var data = {
          ID: req.body.id,
          CompanyName: req.body.company[i]
        }
          connection.query('insert into TeacherAssignment set ?', data, function(err,rows){
            if (err){
              console.log(err);
              throw err;
            }
            console.log("Do it");
          })
      }
      res.send({"report": "1"});
    }
  })

})

module.exports = router;
