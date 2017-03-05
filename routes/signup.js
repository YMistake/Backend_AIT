var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);
// var passport = require('passport');

router.post('/', function(req,res,done){
  connection.query("SELECT * FROM startup WHERE Username = ?",req.body.user, function(err, rows) {
      if (err)
          return done(err);
      if (rows.length) {
          res.send({"report": "0"});
      } else {
          var data = {
          Username: req.body.user,
          Password: req.body.pass,
          Firstname: req.body.first,
          Lastname: req.body.last,
          email: req.body.email,
          Role: req.body.role
          }
					console.log(req.body.first);
          var query = connection.query('insert into startup set ?',data, function(err, result){
						if (err) {
							throw err;
						} else {
							console.log(query.sql)
							res.send({"report": "1"});
						}
          })
        }})
			})

// router.post('/', passport.authenticate('local-signup', {
// 		failureRedirect : '/signup', // redirect back to the signup page if there is an error
// 		failureFlash : true // allow flash messages
// 	}));



module.exports = router;
