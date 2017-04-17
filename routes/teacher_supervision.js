var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){


  connection.query('SELECT CompanyName from TeacherAssignment where ID = ?',req.body.id, function(err, rows){
    if (err){
      console.log(err);
      throw err;
    } else{
      res.send({CompanyName: rows});
    }
  })

})
module.exports = router;
