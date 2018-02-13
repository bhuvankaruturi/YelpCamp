var express                 = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    seedDB                  = require("./seeds"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    flash                   = require("connect-flash"),
    methodOverride          = require("method-override");

var User                = require("./models/user");
var campgroundRoutes    = require("./routes/campgrounds");
var commentRoutes       = require("./routes/comments");
var indexRoutes         = require("./routes/index");
var middlewareObj       = require("./middleware/index");

mongoose.connect("mongodb://bkarutur:airoliA950@ds141657.mlab.com:41657/yelpcamp");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret: "This is the great yelp-camp ubiquitous",
    resave: false,
    saveUninitialized: false
})
);
app.use(passport.initialize());
app.use(passport.session());

//Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB(); //seed the database

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error  = req.flash("error");
    res.locals.success  = req.flash("success");
    res.locals.getDaysDifference = middlewareObj.getDaysDifference;
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp v11 server has started");
});