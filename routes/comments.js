var express = require("express");
var router = express.Router({mergeParams: true});
var middlewareObj = require("../middleware/index");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//=================
//COMMENTS Routes
//=================

//NEW Route
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           req.flash("error", "Comment not found");
       } else {
           res.render("comments/new", {campground: campground});
       }
   }); 
});

//CREATE Route
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err || !campground){
            req.flash("error", "Oh snap! Something went wrong");
            console.log("Something went wrong: " + err);
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log("Something went wrong: " + err);
                } else {
                    //add the current logged in user to new comment
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save(function(err){
                        if(err){
                            console.log("Something went wrong: " + err);
                        }
                    });
                    res.redirect("/campgrounds/" + campground._id);
                }
            }); 
        }
    }); 
});

//EDIT Route For Comments
router.get("/:commentId/edit", middlewareObj.checkCommentAuthorization, function(req, res){
    Comment.findById(req.params.commentId, function(err, foundComment){
        if(err || !foundComment){
            console.log(err);
            req.flash("error", "Oh Snap! Something went wrong");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campgroundId: req.params.id, comment: foundComment}); 
        }
    });
});

//UPDATE Route for Comments
router.put("/:commentId", middlewareObj.checkCommentAuthorization, function(req, res){
    // res.send("you hit the update route");
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment){
        if(err || !updatedComment){
            console.log(err);
            req.flash("error", "Alas! Couldn't edit the comment");
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY Route for comments 
router.delete("/:commentId", middlewareObj.checkCommentAuthorization, function(req, res){
   Comment.findByIdAndRemove(req.params.commentId, function(err){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

module.exports = router;