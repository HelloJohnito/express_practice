var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession = require("express-session");
var User = require("./models/user");

var app = express();
mongoose.connect("mongodb://localhost/auth_demo");
mongoose.Promise = global.Promise; 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
  secret: "we use this sentence to decode the session",
  resave: false,
  saveUninitialized: false
}));

// responsible for reading the session, taking the data and decoding the session. Then serialize it and pu it back

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//===============================
// Routes
//===============================


app.get("/", function(req, res){
  res.render("home");
});

app.get("/secret", function(req, res){
  res.render("secret");
});

//show sign up form
app.get("/register", function(req, res){
  res.render("register");
});

//handles input
app.post("/register", function(req, res){
  req.body.username
  req.body.password

  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secret");
    });
  });
});



app.listen(3000, function(){
  console.log("Server has Started");
});
