var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var passport = require('passport');
var connection = mysql.createConnection(config);
// require('../config/passport')(passport);

router.post('/', function(req,res,done){
  connection.query("SELECT * from startup WHERE Id = ?",req.body.id, function(err,rows){
    if(err)
      return done(err);
    if(rows.length){
      res.send({"report": "0"}); //ถ้ามีข้อมูลแล้วให้ส่ง 0 เพื่อไม่ต้องเรียกหน้า signup
      // TODO เพิ่มการส่ง Role ที่ได้จากการ query กลับไปด้วย
    } else {
      res.send({"report": "1"});
    }
  })
})


// router.post('/', passport.authenticate('local-login', {
//     successRedirect: '/home', // redirect to the secure profile section
//     failureRedirect: '/', // redirect back to the signup page if there is an error
//     failureFlash: false // allow flash messages
// }), function(req, res) {
//     console.log("hello");
//
//     // if (req.body.remember) {
//     //     req.session.cookie.maxAge = 1000 * 60 * 3;
//     // } else {
//     //     req.session.cookie.expires = false;
//     // }
//     // res.redirect('/');
// });

module.exports = router;
