var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, next){

  var query = connection.query('SELECT distinct startup.Id,Firstname,Lastname,picture,Recommend from startup left join (student, review) on (startup.Id=student.Id and startup.Id=review.Id) WHERE CName = ?',req.body.company, function(err, rows){
    console.log(err);
    console.log(rows);
    res.send({data: rows});
  })

})
module.exports = router;
