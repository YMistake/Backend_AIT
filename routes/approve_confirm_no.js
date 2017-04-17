var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){
  connection.query('SELECT 1 from ApproveStatus where CompanyName = ?', req.body.CompanyName, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else if(rows.length) {
      connection.query('update ApproveStatus set Status = 3 where CompanyName = ?',req.body.CompanyName,function(err,name){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({report: 1});
        }
      })
    }
  })

})
module.exports = router;
