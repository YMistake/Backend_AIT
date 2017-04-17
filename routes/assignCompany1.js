var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res){

  connection.query('SELECT ID,Firstname,Lastname,Picture from Startup where Role = "teacher"', function(err, rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      res.send({teacher: rows});      
    }

  })

})
module.exports = router;
