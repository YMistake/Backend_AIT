var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);


router.post('/', function(req,res){
  connection.query('SELECT year from Admin',function(err,rows){
    if (err){
      console.log(err);
      throw err;
    } else if(rows.length){
      connection.query('update Admin set year = ? where Indexs = 1', req.body.year, function(err,rows2){
        if (err){
          console.log(err);
          throw err;
        } else {
          res.send({report: 1});
        }
      })
    } else {
      connection.query('insert into Admin set year = ? where Indexs = 1', req.body.year, function(err,rows3){
        if (err){
          console.log(err);
          throw err;
        } else {
          res.send({report: 1});
        }
      })
    }
  })
})

router.get('/', function(req,res){
  connection.query('SELECT year from Admin', function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      res.send({year: rows[0].year})
    }
  })
})

module.exports = router;
