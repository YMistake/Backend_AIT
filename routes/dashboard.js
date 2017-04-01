var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.get('/', function(req, res) {
  var d = new Date();
  var year = d.getFullYear() + 543;
  var month = d.getMonth();

  if (month >= 7){
    year = year;
  } else {
    year = year-1;
  }

  connection.query('SELECT count(1) as count from startup where role = "student"', function(err, num){
    if (err){
      console.log(err);
      throw err;
    } else {
      connection.query('SELECT count(1) as count from student where Major = "computer" and AcademicYear = ?',year, function(err, com){
        if(err){
          console.log(err);
          throw err;
        } else {
          connection.query('SELECT count(1) as count from student where Major = "telecom" and AcademicYear = ?',year, function(err, telecom){
            if(err){
              console.log(err);
              throw err;
            } else {
              connection.query('SELECT count(1) as count from student where Major = "electronic" and AcademicYear = ?',year, function(err, elec){
                if(err){
                  console.log(err);
                  throw err;
                } else {
                  console.log(num);
                  console.log(com);
                  console.log(telecom);
                  console.log(elec);
                  res.send({num: num, com: com, telecom: telecom, elec: elec, year: year})
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
