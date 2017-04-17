var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);


router.post('/', function(req,res){
  connection.query('SELECT * from Admin where pin = ?',req.body.pin,function(err,rows){
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
