var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, done){

  var data = {
    ID: req.body.id,
    Recommend: req.body.rec,
    WorkEnvironment: req.body.Work_Environment,
    Travel: req.body.Travel,
    Bistro: req.body.Bistro
  }
  connection.query('SELECT 1 from Review where ID = ?', req.body.id,function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else if(rows.length){
      connection.query('update Review set ? where ID = ?', [data,data.ID],function(err){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({report: 1});
        }
      });
    } else {
      connection.query('insert into Review set ?', data, function(err){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({report: 1})
        }
      });
    }
  })

})
module.exports = router;
