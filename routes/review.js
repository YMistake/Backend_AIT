var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, done){

  var data = {
    Id: req.body.id,
    Recommend: req.body.rec,
    Climate: req.body.climate,
    Travel: req.body.travel,
    Eating: req.body.eat
  }
  connection.query('SELECT Id from review where Id = ?', req.body.id,function(err,rows){
    if(err)
      return done(err);
    if(rows.length){
      connection.query('update review set ?', data);
    } else {
      connection.query('insert into review set ?', data);
    }
  })
  // var query = connection.query('insert into review set ?', data, function(err, result){
  //   console.log(result);
  //   console.log(err);
  //   console.log(query.sql);
  // })

})
module.exports = router;
