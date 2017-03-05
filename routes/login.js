var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../connection.json');
var connection = mysql.createConnection(config);

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/home', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: false // allow flash messages
}), function(req, res) {
    console.log("hello");

    // if (req.body.remember) {
    //     req.session.cookie.maxAge = 1000 * 60 * 3;
    // } else {
    //     req.session.cookie.expires = false;
    // }
    res.redirect('/');
});

module.exports = router;
