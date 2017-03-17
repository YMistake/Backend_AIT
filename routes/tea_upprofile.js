var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var data = {
    Id: req.body.id,
    Firstname: req.body.firstname,
    Lastname: req.body.lastname,
    Tel: req.body.tel
  }

  connection.query('SELECT Id from teacher where Id = ?', req.body.id,function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      if(rows.length){
        var query = connection.query('update teacher set ? where Id = ?', [data,data.Id]);
        console.log(query.sql);
      } else {
        var query = connection.query('insert into teacher set ?', data);
        console.log(query.sql);
      }
    }

  })
})
module.exports = router;
