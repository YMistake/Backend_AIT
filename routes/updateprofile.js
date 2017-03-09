var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, next){

  var data = {
    Id: req.body.id,
    AcademicYear: req.body.AcademicYear,
    Major: req.body.Major,
    SId: req.body.SId,
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

  connection.query('SELECT Id from student where Id = ?', req.body.id,function(err,rows){
    if(err)
      return done(err);
      console.log(err);
    if(rows.length){
      var query = connection.query('update student set ?', data);
      console.log(query.sql);
    } else {
      var query = connection.query('insert into student set ?', data);
      console.log(query.sql);
    }
  })


  // var query = connection.query('insert into student set ?', data, function(err, result){
  //   console.log(result);
  //   console.log(query.sql);
  // })

})
module.exports = router;
