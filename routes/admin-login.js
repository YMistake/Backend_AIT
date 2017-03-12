var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var passport = require('passport');
var connection = mysql.createConnection(config);


router.post('/', function(req,res){
  connection.query('SELECT * from admin where pin = ?',req.body.pin,function(err,rows){
    if(err){
      console.log(err);
      throw err;
    }
    if (rows.length){
      res.send({"report": "1"});
    } else {
      res.send({"report": "0"});
    }

  })
})

module.exports = router;
