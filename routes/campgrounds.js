var express = require("express");
var router = express.Router();
var middlewareObj = require("../middleware/index");
var Campground = require("../models/campground");

//INDEX Route to show all campgrounds
router.get("/", function(req, res){
        //Get all campgrounds from DB
        Campground.find({}, function(err, campgrounds){
            if(err){
                console.log("Something went wrong: " + err);
                req.flash("error", "Campground not found");
            } else {
                res.render("campgrounds/index", {campgrounds: campgrounds});
            }
        });
});

//NEW route to display form to make a new campgrounds
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//CREATE to add new campground to database
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var newCampground = req.body.campground;
    newCampground.author = {
        id: req.user._id, 
        username: req.user.username
    };
    Campground.create(newCampground, 
        function(err, campground){
            if(err){
                console.log("Something went wrong: " + err);
                req.flash("error", "Oh snap! Something went wrong");
            } else {
                req.flash("success", "Campground created successfully!")
                res.redirect("/campgrounds"); 
            }
        }
    );
});

//SHOW route to show info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            console.log("Something went wrong: " + err);
            req.flash("error", "That campground is not found");
            res.redirect("back");
        } else {
                foundCampground.description = middlewareObj.replaceNewline(foundCampground.description);
                res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT GET Route 
router.get("/:id/edit", middlewareObj.checkCampgroundAuthorization, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            console.log(err);
            req.flash("error", "That campground is not found");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//EDIT PUT Route
router.put("/:id", middlewareObj.checkCampgroundAuthorization, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err || !updatedCampground){
            console.log(err);
            req.flash("error", "That campground is not found");
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

//DESTROY Campground Route
router.delete("/:id", middlewareObj.checkCampgroundAuthorization, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("error", "Campground deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;