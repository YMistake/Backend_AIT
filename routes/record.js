var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res){

  var query = connection.query('SELECT distinct AcademicYear from student ORDER BY AcademicYear DESC', function(err, rows){
    console.log(err);
    console.log(rows);
    res.send({year: rows});
  })

})
module.exports = router;
