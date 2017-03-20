var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  console.log(req.body.id);
  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }

  connection.query('SELECT company from teacher where Id = ? AND AcademicYear = ?',[req.body.id,year], function(err, rows){
    console.log(year);
console.log(rows);

    if (err){
      console.log(err);
      throw err;
    } else{
      res.send({CName: rows});
    }
  })

})
module.exports = router;
