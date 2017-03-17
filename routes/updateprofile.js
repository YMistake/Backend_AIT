var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/',function(req, res){

    var d = new Date();
    var year = d.getFullYear() + 543;
    var month = d.getMonth();

    if (month >= 7){
      res.send({year: year})
    } else {
      res.send({year: year-1})
    }
})

router.post('/', function(req, res){

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

  var data2 = {
    AcademicYear: req.body.AcademicYear,
    CName: req.body.CName,
    CAddress: req.body.CAddress,
    CTel: req.body.CTel
  }

  connection.query('SELECT Id from student where Id = ?', req.body.id,function(err,rows){
    if(err){
      console.log(err);
      return done(err);
    } else {
      if(rows.length){
        var query = connection.query('update student set ? where Id = ?', [data,data.Id]);
        console.log(query.sql);
      } else {
        var query = connection.query('insert into student set ?', data);
        console.log(query.sql);
      }
    }

  })
  connection.query('SELECT 1 from company where AcademicYear = ? AND CTel = ?', [data2.AcademicYear,data2.CTel], function(err,rows){
    if(err){
      console.log(err);
      return done(err);
    } else {
      if(rows.length){
        var query = connection.query('update company set ? where AcademicYear = ? AND CTel = ?', [data2,data2.AcademicYear,data2.CTel]);
        console.log(query.sql);
      } else {
        var query = connection.query('insert into company set ?', data2);
        console.log(query.sql);
      }
    }
  })

})
module.exports = router;
