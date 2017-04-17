var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res){

  connection.query('SELECT distinct CompanyName from ApproveStatus where Status = 1 ORDER BY CompanyName ASC', function(err, rows){
    res.send({data: rows});
  })

})
module.exports = router;
