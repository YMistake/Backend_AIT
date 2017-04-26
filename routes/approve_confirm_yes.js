var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

      connection.query('update ApproveStatus set Status = 2 where CID = ?',req.body.CID,function(err,name){
        if(err){
          console.log(err);
          throw err;
        } else {
          res.send({report: 1});
        }
      })

})
module.exports = router;
