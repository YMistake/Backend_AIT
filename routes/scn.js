var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT Submitter from sent_company WHERE Submitter = ?', req.body.id, function(err,rows){
    console.log("delete");
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('delete from sent_company where Submitter = ?', req.body.id, function(err){
        if(err){
          console.log(err);
          throw err;
        }
        console.log("delete already");
        for (var i = 0, len = req.body.list.length; i < len; i++){
          var data = {
            Submitter: req.body.id,
            SId: req.body.list[i],
            CName: req.body.CompanyName
          }
            connection.query('insert into sent_company set ?', data, function(err,rows){
              console.log("insert");
              if (err){
                console.log(err);
                throw err;
              }
              console.log(rows);
              console.log("insert already");
            })
        }
      })
    }
  })


})
module.exports = router;
