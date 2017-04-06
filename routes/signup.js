var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', function(req,res,done){

          var data = {
          Id: req.body.id,
          Firstname: req.body.first,
          Lastname: req.body.last,
          email: req.body.email,
          Role: req.body.role,
          picture: req.body.picture
          }

          var query = connection.query('insert into startup set ?',data, function(err, result){
						if (err) {
							throw err;
						} else {
							res.send({"report": "1"});
						}
          })
			})

module.exports = router;
