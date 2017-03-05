var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, next){

  var data = {
    AcademicYear: req.body.AcademicYear,
    Major: req.body.Major,
    SPosition: req.body.SPosition,
    STel: req.body.STel,
    SFacebook: req.body.SFacebook,
    SLine: req.body.SLine,
    CName: req.body.CName,
    CAddress: req.body.CAddress,
    CTel: req.body.CTel,
    SpvName: req.body.SpvName,
    SpvPosition: req.body.SpvPosition,
    SpvTel: req.body.SpvTel
  }

  var query = connection.query('insert into student set ?', data, function(err, result){
    console.log(result);
    console.log(query.sql);
  })

})
module.exports = router;
