var Campground  = require("../models/campground");
var Comment     = require("../models/comment");        
var middlewareObj = {};

middlewareObj.checkCampgroundAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err || !foundCampground){
               console.log(err);
               req.flash("error", "Campground not found");
               res.redirect("back");
           } else {
               if(foundCampground.author.id.equals(req.user._id)){
                   return next();
               }
               req.flash("error", "You do not have permission to do that");
               res.redirect("/campgrounds/" + foundCampground._id);
           }
        });
    } else {
        req.flash("error", "Please Login to complete the action or Signup");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentAuthorization = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, foundComment){
            if(err){
                console.log(err || !foundComment);
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                }
                req.flash("error", "You do not have permission to do that");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "Please Login to complete the action or Signup");
        res.redirect("/login");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login to complete the action or Signup");
    res.redirect("/login");
};

//avoid escaping newline characters
middlewareObj.replaceNewline = function(input) {
    var newline = '<br>';
    return input.replaceAll('\n', newline);
};

String.prototype.replaceAll = function (find, replace) {
    var result = this;
    var split = result.split(find);
    result = split.join(replace);
    return result;
};

middlewareObj.getDaysDifference = function(date){
    var today = new Date();
    var timeDiff = Math.abs(today.getTime() - date.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    diffDays -= 1;
    if(diffDays <= 7){
        return diffDays === 1 ? diffDays + " day ago" : diffDays + " days ago";
    }
    else if (diffDays > 7 && diffDays < 31) {
        diffDays = Math.floor(diffDays/7);
        return diffDays === 1 ? diffDays + " week ago" : diffDays + " weeks ago";
    }
    else if(diffDays > 31 && diffDays < 366) {
        diffDays = Math.floor(diffDays/30.5);
        return diffDays === 1 ? diffDays + " month ago" : diffDays + " months ago";
    }
    else {
        diffDays = Math.floor(diffDays/365.5);
        return diffDays === 1 ? diffDays + " year ago" : diffDays + " years ago";
    }
};

module.exports = middlewareObj;