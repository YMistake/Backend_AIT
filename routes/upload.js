var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var config = require('../connection.json');
var connection = mysql.createConnection(config);
var multer  =   require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      console.log(__dirname);
        callBack(null, path.join(__dirname, '../FileStorage'));
    },
    filename: function (req, file, callBack) {
        callBack(null, req.body.fileName);
    }
});

var upload = multer({ storage: storage }).single('file');

router.post('/', function(req, res){
    upload(req, res, function(err) {
             if(err) {
                 return res.end("Error uploading file.");
             }
             res.end("File is uploaded");
         });

})
module.exports = router;
