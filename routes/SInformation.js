var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, next){

  var query = connection.query('SELECT distinct picture,CName,SPosition,STel,SFacebook,SLine,Work_Environment,Travel,Bistro from startup left join (student, review) on (startup.Id=student.Id and startup.Id=review.Id) WHERE startup.Id = ?',req.body.id, function(err, rows){
    console.log(err);
    console.log(rows);

    res.send({data: rows});
  })

})
module.exports = router;
