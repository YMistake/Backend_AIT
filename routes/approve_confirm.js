var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT * from sent_company where CName = ?', req.body.CName, function(err, rows){
    if(err){
      console.log(err);
      throw err;
    } else {
        connection.query('SELECT sent_company.SId,Firstname,Lastname,Major,CAddress,CTel from startup left join (student,sent_company) on (startup.Id = student.Id and student.SId = sent_company.SId) where sent_company.CName = ?',req.body.CName,function(err,name){
          if(err){
            console.log(err);
            throw err;
          } else {
            res.send({data: name})
            console.log(name);
          }
        })
      }
  })
})
module.exports = router;
