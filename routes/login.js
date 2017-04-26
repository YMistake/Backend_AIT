var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req,res,done){
  connection.query("SELECT * from Startup WHERE ID = ?",req.body.id, function(err,rows){
    if(err){
      return done(err);
    } else if(rows.length){
      connection.query("SELECT 1 from Startup WHERE Picture = ?",req.body.picture, function(err,pic){
        if(err){
          return done(err);
        } else if(!pic.length){
          connection.query("update Startup set Picture = ? where ID = ?",[req.body.picture,req.body.id], function(err){
            if(err){
              return done(err);
            }
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
