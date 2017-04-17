var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var query = connection.query('SELECT distinct Picture,Tel,Facebook,Line,WorkEnvironment,Travel,Bistro from Startup left join (Student, Review) on (Startup.ID=Student.ID and Startup.ID=Review.ID) WHERE Startup.ID = ?',req.body.id, function(err, rows){
    console.log(err);
    console.log(rows);

    res.send({data: rows});
  })

})
module.exports = router;
