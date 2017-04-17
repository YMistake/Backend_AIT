var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var data = {
    ID: req.body.id,
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Email: req.body.Email,
    Role: req.body.Role,
    Picture: req.body.Picture
  }

  var data2 = {
    ID: req.body.id,
    CompanyName: req.body.CompanyName,
    Position: req.body.Position,
    Tel: req.body.Tel
  };

  connection.query('SELECT 1 from Startup where ID = ?', data.ID, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      if(rows.length){
        connection.query('update Startup set ? where ID = ?', [data,data.ID],function(err){
          if(err){
            console.log(err);
            throw err;
          }
        });
      } else {
        connection.query('insert into Startup set ?', data, function(err){
          if(err){
            console.log(err);
            throw err;
          }
        });
      }
    }
  })

  connection.query("SELECT 1 from Supervisor WHERE ID = ?",req.body.id, function(err, rows) {
    if(err){
      console.log(err);
      throw err;
    } else {
      if(rows.length) {
        connection.query("update Supervisor set ? where ID = ?",[data2,req.body.id],function(err){
          if(err){
            console.log(error);
            throw err;
          }
        });
        res.send({"report": "1"});
      } else {
        connection.query("insert into Supervisor set ?",data2, function(err){
          if(err){
            console.log(err);
            throw err;
          }
        });
        res.send({"report": "1"});
      }
    }
  })

})
module.exports = router;
