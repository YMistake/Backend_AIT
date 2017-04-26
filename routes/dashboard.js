var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res) {
  var year;

  connection.query('SELECT year from Admin where Indexs = 1',function(err,rows){
    if(err){
      console.log(err);
      throw err;
    } else {
      year = rows[0].year;

        connection.query('SELECT count(1) as count from Startup where role = "student"', function(err, num){
          if (err){
            console.log(err);
            throw err;
          } else {
            connection.query('SELECT count(1) as count from Student where Major = "computer" and AcademicYear = ?',year, function(err, com){
              if(err){
                console.log(err);
                throw err;
              } else {
                connection.query('SELECT count(1) as count from Student where Major = "telecom" and AcademicYear = ?',year, function(err, telecom){
                  if(err){
                    console.log(err);
                    throw err;
                  } else {
                    connection.query('SELECT count(1) as count from Student where Major = "electronic" and AcademicYear = ?',year, function(err, elec){
                      if(err){
                        console.log(err);
                        throw err;
                      } else {
                        res.send({num: num, com: com, telecom: telecom, elec: elec, year: year})
                      }
                    })
                  }
                })
              }
            })
          }
        })
    }
  })

});

module.exports = router;
