var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, next){
  connection.connect(function(err, results) {
      if (err) {
          console.log("ERROR: " + err.message);
          throw err;
      } else
      console.log("connected.");
  });

  var data = {
    AcademicYear: req.body.AcademicYear,
    Major: req.body.Major,
    SPosition: req.body.SPosition,
    STel: req.body.STel,
    SLine: req.body.SLine,
    CName: req.body.CName,
    CAddress: req.body.CAddress,
    CTel: req.body.CTel,
    SpvName: req.body.SpvName,
    SpvPosition: req.body.SpvPosition,
    SpvTel: req.body.SpvTel,
    Picture: req.body.temp
  }

  connection.query('insert into student set ?', data, function(err, result){})

})
