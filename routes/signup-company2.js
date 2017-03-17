var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res, done){

  console.log(req.body);
  var data = {
    Id: req.body.id,
    CName: req.body.CName
  };

  connection.query("SELECT * from supervisor WHERE Id = ?",req.body.id, function(err, rows) {
    if(err)
      return done(err);
    if(rows.length) {
      var query = connection.query("update supervisor set ? where Id = ?",[data,req.body.id]);
      console.log(query.sql);
      res.send({"report": "1"});
    } else {
      var query = connection.query("insert into supervisor set ?",data);
      console.log(query.sql);
      res.send({"report": "1"});
    }

  })

})
module.exports = router;
