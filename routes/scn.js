var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, next){

  // var list = req.body;
  console.log(req.body.id);
  console.log(req.body.list)
  console.log(req.body.list[0]);
  console.log(req.body.list[1]);

  for (var i = 0, len = req.body.list.length; i < len; i++){
    var data1 = {
      Submitter: req.body.id,
      SId: req.body.list[i],
      CName: req.body.CompanyName
    }

    connection.query('insert into sent_company set ?', data1, function(err,rows){
      if (err){
        console.log(err);
        throw err;
      }
      console.log(rows);
    })
  }

  var data2 = {
    CName: req.body.CompanyName,
    CAddress: req.body.CompanyAddress,
    CTel: req.body.CompanyTel
  }

  connection.query('SELECT CName from company where CName = ?', req.body.CompanyName,function(err,rows){
    if(err){
      console.log(err);
      throw err;
    }
    if(rows.length){
      var query = connection.query('update company set ? where CName = ?', [data2,data2.CName], function(err){
        if(err){
          console.log(err);
          throw err;
        }
      });
      console.log(query.sql);
    } else {
      var query = connection.query('insert into company set ?', data2, function(err){
        if(err){
          console.log(err);
          throw err;
        }
      });
      console.log(query.sql);
    }
  })


  // var query = connection.query('insert into student set ?', data, function(err, result){
  //   console.log(result);
  //   console.log(query.sql);
  // })

})
module.exports = router;
