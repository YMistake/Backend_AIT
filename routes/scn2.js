var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }

  connection.query('SELECT Status from approve_status where Submitter = ? and AcademicYear = ?', [req.body.id, year], function(err,rows){
    if (err){
      console.log(err);
      throw err;
    } else {
      res.send(rows)
      console.log(rows);
    }
  })

})
module.exports = router;
