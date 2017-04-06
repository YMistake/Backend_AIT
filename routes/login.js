var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req,res,done){
  console.log(req.body.id);
  connection.query("SELECT * from startup WHERE Id = ?",req.body.id, function(err,rows){
    if(err)
      return done(err);
    console.log(rows);
    if(rows.length){
      console.log(rows);
      connection.query("SELECT picture from startup WHERE picture = ?",req.body.picture, function(err,rows){
        if(err)
          return done(err);
        if(!rows.length){
          connection.query("update startup set 'picture' = ? where Id = ?",[req.body.picture,req.body.id], function(err){
            return done(err);
          });
        }
      })
      res.send({"report": "0", "Role": rows[0].Role}); //ถ้ามีข้อมูลแล้วให้ส่ง 0 เพื่อไม่ต้องเรียกหน้า signup

    } else {
      res.send({"report": "1"});
    }
  })
})
module.exports = router;
