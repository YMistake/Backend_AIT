var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

        connection.query('SELECT sent_company.SId,Firstname,Lastname,Major,sent_company.CAddress,sent_company.CTel from startup left join (student,sent_company) on (startup.Id = student.Id and student.SId = sent_company.SId) where sent_company.CName = ?',req.body.CName,function(err,rows){
          if(err){
            console.log(err);
            throw err;
          } else {
            connection.query('SELECT img from approve_status where CName = ?',req.body.CName,function(err,img){
              if(err){
                console.log(err);
                throw err;
              } else {
                var buffer = img[0].img.toString();
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
