var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

        connection.query('SELECT ApproveStatus.SID,Firstname,Lastname,Major,CompanyAddress,CompanyTels from Company inner join (Startup , Student , ApproveStatus) on (Startup.ID = Student.ID AND Student.SID = ApproveStatus.SID AND ApproveStatus.CompanyName = Company.CompanyName) where Company.CompanyName = ?',req.body.CompanyName,function(err,rows){
          if(err){
            console.log(err);
            throw err;
          } else {
            connection.query('SELECT Image from Company where CompanyName = ?',req.body.CompanyName,function(err,img){
              if(err){
                console.log(err);
                throw err;
              } else {
                var buffer = img[0].Image.toString();
                var base64Data = buffer.replace(/^data:image\/jpeg;base64,/,"");
                var base64Data2 = base64Data.replace(/[\s\r\n]/g,"+");
                var base64Image = "data:image/jpeg;base64," + base64Data2
                res.send({data: rows, img: base64Image})
              }
            })
          }
        })

})
module.exports = router;
