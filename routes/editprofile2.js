var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req,res){

  var data = {
    ID: req.body.id,
    AcademicYear: req.body.AcademicYear,
    Major: req.body.Major,
    SID: req.body.SID,
    Tel: req.body.Tel,
    Facebook: req.body.Facebook,
    Line: req.body.Line,
  }

  connection.query('update Student set ? where ID = ?',[data, data.ID], function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      res.send({report: 1})
    }
  })
})

module.exports = router;
