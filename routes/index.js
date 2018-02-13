var express = require("express");
var middlewareObj = require("../middleware/index.js")
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
//Home or Root Route
router.get("/", function(req, res){
    res.render("landing");
});


//===========================
//Authentication Routes Below
//===========================

//GET Register form route
router.get("/register", function(req, res){
    res.render("auth/register");
});

//POST Register Route
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            //console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//GET Login Route
router.get("/login", function(req, res){
    res.render("auth/login");
});

//POST Login Route
router.post('/login',
  passport.authenticate('local', { successRedirect: '/campgrounds',
                                   failureRedirect: '/login',
                                   failureFlash: true}));
                                   
//GET Logout Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out successfully!");
    res.redirect("/campgrounds");
});

module.exports = router;