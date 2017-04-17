var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req, res){

  connection.query('SELECT SID from Student where ID = ?', req.body.id, function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      connection.query('SELECT Status from ApproveStatus where SID = ?', rows[0].SID, function(err,rows2){
        if(err){
          console.log(err);
          throw err;
        } else {
          if(rows2.length){
            data = rows2[0].Status;
            res.send({data: data});
          } else {
            res.send({data: 4});
          }
        }
      })
    }
  })
  //
  // connection.query('SELECT Status from approve_status where Submitter = ? and AcademicYear = ?', [req.body.id, year], function(err,rows){
  //   if (err){
  //     console.log(err);
  //     throw err;
  //   } else {
  //     if(rows.length){
  //       data = rows[0].Status;
  //       res.send({data: data});
  //     }else {
  //       res.send({data: 4})
  //     }
  //
  //   }
  // })

})
module.exports = router;
