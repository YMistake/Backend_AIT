var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res){

  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }

  var query = connection.query('SELECT CName from company WHERE AcademicYear = ?',year, function(err, rows){
    console.log(err);
    console.log(rows);
    res.send({company: rows});
  })
})

router.post('/', function(req, res){
  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }
  console.log(req.body.id);
  console.log(year);
  console.log(req.body.company);
  connection.query('SELECT Id from teacher WHERE Id = ? AND AcademicYear = ?', [req.body.id,year], function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('delete from teacher where Id = ? AND AcademicYear = ?', [req.body.id,year], function(err){
console.log("done1");
        if(err){
          console.log(err);
          throw err;
        } else {
          console.log("done2");
          for (var i =0, len = req.body.company.length; i < len; i++){
            var data = {
              Id: req.body.id,
              AcademicYear: year,
              company: req.body.company[i]
            }
              connection.query('insert into teacher set ?', data, function(err,rows){
                console.log("insert");
                if (err){
                  console.log(err);
                  throw err;
                }
                console.log(rows);
                console.log("insert already");
              })
          }
          res.send({"report": "1"});
        }
      })
    }
  })

})

module.exports = router;
