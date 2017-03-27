var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }


  connection.query('SELECT Submitter from sent_company WHERE Submitter = ?', req.body.id, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('delete from sent_company where Submitter = ?', req.body.id, function(err){
        if(err){
          console.log(err);
          throw err;
        }
        for (var i = 0, len = req.body.list.length; i < len; i++){
          var data = {
            Submitter: req.body.id,
            SId: req.body.list[i],
            CName: req.body.CompanyName
          }
            connection.query('insert into sent_company set ?', data, function(err,rows){
              if (err){
                console.log(err);
                throw err;
              }
            })
        }
      })
    }
  })

  var data2 = {
    Submitter: req.body.id,
    AcademicYear: year,
    CName: req.body.CompanyName,
    Status: 1,
    img: req.body.img
  }

  connection.query('SELECT Submitter from approve_status WHERE Submitter = ?', req.body.id, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else if (rows.length) {
      connection.query('update approve_status set ? where Submitter = ?',[data2,req.body.id], function(err){
        if(err){
          console.log(err);
          throw err;
        }
      })
    } else {
      connection.query('insert into approve_status set ?', data2, function(err,rows){
        if (err){
          console.log(err);
          throw err;
        }
      })
    }
  })

})
module.exports = router;
