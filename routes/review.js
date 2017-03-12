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
    Work_Environment: req.body.Work_Environment,
    Travel: req.body.Travel,
    Bistro: req.body.Bistro
  }
  connection.query('SELECT Id from review where Id = ?', req.body.id,function(err,rows){
    console.log(rows);
    if(err)
      return done(err);
      console.log(err);
    if(rows.length){
      console.log("Done rows.length");
      var query = connection.query('update review set ? where Id = ?', [data,data.Id]);
      console.log(query.sql);
    } else {
      console.log("Do Else");
      var query = connection.query('insert into review set ?', data);
      console.log(query.sql);
    }
  })
  // var query = connection.query('insert into review set ?', data, function(err, result){
  //   console.log(result);
  //   console.log(err);
  //   console.log(query.sql);
  // })

})
module.exports = router;
