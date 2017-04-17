var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res){

  connection.query('SELECT distinct AcademicYear from Student ORDER BY AcademicYear DESC', function(err, rows){
    res.send({year: rows});
  })

})
module.exports = router;
