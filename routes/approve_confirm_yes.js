var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){
  connection.query('SELECT 1 from approve_status where CName = ?', req.body.CName, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else if(rows.length) {
      connection.query('update approve_status set Status = 2 where CName = ?',req.body.CName,function(err,name){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({report: 1});
        }
      })
    }
  })

  connection.query('DELETE from sent_company where CName = ?', req.body.CName);
})
module.exports = router;
