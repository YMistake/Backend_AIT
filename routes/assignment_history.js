var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){
  console.log(req.body.id);
  connection.query('SELECT CompanyName from TeacherAssignment left join Company on (TeacherAssignment.CID = Company.CID) where ID = ?', req.body.id, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      res.send({company: rows});
      console.log(rows);
    }
  })

})
module.exports = router;
