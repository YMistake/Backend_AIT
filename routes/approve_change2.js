var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

        connection.query('SELECT Submitter,ApproveStatus.SID,Firstname,Lastname,Major,CompanyAddress,CompanyTels from Company left join (Startup , Student , ApproveStatus) on (Startup.ID = Student.ID AND Student.SID = ApproveStatus.SID AND ApproveStatus.CID = Company.CID) where Company.CID = ? and Status = 3',req.body.CID,function(err,rows){
          if(err){
            console.log(err);
            throw err;
          } else {
            connection.query('select Firstname,Lastname from Startup where ID = ?', rows[0].Submitter, function(err,submitter){
              if(err){
                console.log(err);
                throw err;
              } else {
                connection.query('SELECT Image from Company where CID = ?',req.body.CID,function(err,img){
                  if(err){
                    console.log(err);
                    throw err;
                  } else {
                    var buffer = img[0].Image.toString();
                    var base64Data = buffer.replace(/^data:image\/jpeg;base64,/,"");
                    var base64Data2 = base64Data.replace(/[\s\r\n]/g,"+");
                    var base64Image = "data:image/jpeg;base64," + base64Data2
                    res.send({data: rows, img: base64Image, SFirstname: submitter[0].Firstname, SLastname: submitter[0].Lastname});
                    console.log(rows);
                  }
                })
              }
            })

          }
        })

})
module.exports = router;
