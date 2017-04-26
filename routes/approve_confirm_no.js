var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

    for (var i = 0, l = req.body.list.length; i<l; i++){
      connection.query('update ApproveStatus set Status = 3 where CID = ? and SID = ?',[req.body.CID,req.body.list[i]], function(err){
        if(err){
          console.log(err);
          throw err;
        }
      })
      if(i == (l-1)){
        res.send({report: 1});
      }
    }

})
module.exports = router;
