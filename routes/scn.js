var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT Submitter from ApproveStatus WHERE Submitter = ?', req.body.id, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('delete from ApproveStatus where Submitter = ?', req.body.id, function(err){
        if(err){
          console.log(err);
          throw err;
        }
        for (var i = 0, len = req.body.list.length; i < len; i++){
          var data = {
            Submitter: req.body.id,
            SID: req.body.list[i],
            CompanyName: req.body.CompanyName,
            Status: 1
          }
            connection.query('insert into ApproveStatus set ?', data, function(err,rows){
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
    CompanyName: req.body.CompanyName,
    CompanyAddress: req.body.CompanyAddress,
    CompanyTels: req.body.CompanyTels,
    Image: req.body.img
  }

  connection.query('SELECT 1 from Company WHERE CompanyName = ?', req.body.CompanyName, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else if (rows.length) {
      connection.query('update Company set ? where CompanyName = ?',[data2,req.body.CompanyName], function(err){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({report: "1"})
        }
      })
    } else {
      connection.query('insert into Company set ?', data2, function(err,rows){
        if (err){
          console.log(err);
          throw err;
        } else {
          res.send({report: "1"})
        }
      })
    }
  })

})
module.exports = router;
