var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var data = {
    ID: req.body.id,
    AcademicYear: req.body.AcademicYear,
    Major: req.body.Major,
    SID: req.body.SID,
    Tel: req.body.Tel,
    Facebook: req.body.Facebook,
    Line: req.body.Line,
  }

  var data2 = {
    ID: req.body.id,
    Firstname: req.body.firstname,
    Lastname: req.body.lastname,
    Email: req.body.email,
    Picture: req.body.picture,
    Role: req.body.role
  }

  connection.query('SELECT 1 from Startup where ID = ?', data2.ID, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      if(rows.length){
        var query = connection.query('update Startup set ? where ID = ?', [data2,data2.ID],function(err){
          if(err){
            console.log(err);
            throw err;
          } else {
            res.send({report: 1});
          }
        });
      } else {
        var query = connection.query('insert into Startup set ?', data2,function(err){
          if(err){
            console.log(err);
            throw err;
          } else {
            res.send({report: 1});
          }
        });

      }
    }
  })


  connection.query('SELECT 1 from Student where ID = ?', data.ID,function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      if(rows.length){
        var query = connection.query('update Student set ? where ID = ?', [data,data.ID]);
        console.log(query.sql);
      } else {
        var query = connection.query('insert into Student set ?', data);
        console.log(query.sql);
      }
    }
  })


})
module.exports = router;
