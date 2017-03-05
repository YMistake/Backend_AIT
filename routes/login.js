var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req,res,next){
  var data = {
    Username: req.body.Username,
    Password: req.body.Password
  }

  var query = connection.query('select Username,Password,Role from startup where ?', data, function(err){
    console.log(query.sql);
    //ยังไม่รู้ทำไงต่อ
    // if (err){
    //   console.log("ERROR: " + err.message);
    //   throw err;
    // } else if (!Username){
    // }
  })
})

module.exports = router;
