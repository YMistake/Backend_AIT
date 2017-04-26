var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  var data2 = {
    CompanyName: req.body.CompanyName,
    CompanyAddress: req.body.CompanyAddress,
    CompanyTels: req.body.CompanyTels,
    Image: req.body.img
  }

  function Check(){
    var i = 0;

    function next(){
      if(i < req.body.list.length){
        connection.query('SELECT 1 from Student where SID = ?', req.body.list[i], function(err,chk){
          i++;
          if(err){
            console.log(err);
            throw err;
          } else if(!chk.length) {
            res.send({report: 2});
            i = 10000;
          }
          next();
        });
      } else if(i == req.body.list.length){
        QR();
      }
    }
    next();
  }

  function Delete(){
    for(var j=0, l = req.body.list.length; j<l;j++){
      connection.query('delete from ApproveStatus where SID = ?', req.body.list[j],function(err){
        if(err){
          console.log(err);
          throw err;
        }
      })
    }
  }

  function QR(){
    connection.query('SELECT CID from Company WHERE CompanyName = ?', req.body.CompanyName, function(err,CID){
      if(err){
        console.log(err);
        throw err;
      } else if (CID.length) {
        connection.query('update Company set ? where CompanyName = ?',[data2,req.body.CompanyName], function(err){
          if(err){
            console.log(err);
            throw err;
          } else {
            Delete();
            for (var i = 0, len = req.body.list.length; i < len; i++){
              var data = {
                Submitter: req.body.id,
                SID: req.body.list[i],
                CID: CID[0].CID,
                Status: 1
              }
              connection.query('insert into ApproveStatus set ?', data, function(err,rows){
                if (err){
                  console.log(err);
                  throw err;
                }
              })
              if(i == (len-1)){
                res.send({report: 1});
              }
            }
          }
        })
      } else {
        connection.query('insert into Company set ?', data2, function(err,rows){
          if (err){
            console.log(err);
            throw err;
          } else {
            connection.query('SELECT CID from Company where CompanyName = ?', req.body.CompanyName, function(err,cid){
              console.log(cid);
              if(err){
                console.log(err);
                throw err;
              } else {
                Delete();
                for (var i = 0, len = req.body.list.length; i < len; i++){
                  var data = {
                    Submitter: req.body.id,
                    SID: req.body.list[i],
                    CID: cid[0].CID,
                    Status: 1
                  }
                  connection.query('insert into ApproveStatus set ?', data, function(err,rows){
                    if (err){
                      console.log(err);
                      throw err;
                    }
                  })
                  if(i == (len-1)){
                    res.send({report: 1});
                  }
                }
              }
            })
          }
        })
      }
    })
  }

  Check();


})
module.exports = router;
