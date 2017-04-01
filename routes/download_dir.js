var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);
var path = require('path');
var filelist = [];

router.get('/', function(req, res){
      const FileStorage = path.join(__dirname, '../FileStorage');
      const fs = require('fs');
      fs.readdir(FileStorage, (err, files) => {
        files.forEach(file => {
          filelist.push(file);
        });
        console.log(filelist);
        res.send(filelist);
        filelist = [];
      })

})
module.exports = router;
