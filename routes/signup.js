var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);


router.post('/', function(req,res,next){
  connection.connect(function(err, results) {
      if (err) {
          console.log("ERROR: " + err.message);
          throw err;
      } else
      console.log("connected.");
  });

  var data = {
  Username: req.body.user,
  Password: req.body.pass,
  Firstname: req.body.first,
  Lastname: req.body.last,
  email: req.body.email,
  Role: req.body.role
  }

  connection.query('insert into student set ?', data, function(err, result){console.log(result)})
  // if (data.role == "student"){
  //   connection.query('insert into student set ?', data, function(err, result){})
  // } else if (data.role == "teacher"){
  //   connection.query('insert into professor set ?', data, function(err, result){})
  // } else if (data.role == "company"){
  //   connection.query('insert into company set ?', data, function(err, result){})
  // }
})

module.exports = router;
