var express = require("express");
var app = express();

// app.use(express.static(__dirname + '/public'));
app.use(express.static("style"));
//you don;t have to write ejs files in render
app.set("view engine", "ejs");

////////// Routes////////////////
app.get("/", function(req, res){
  res.render("homepage"); //home.ejs is off bc app.set
});


//anything can go inside subredditName.
app.get("/r/:subredditName", function(req, res){
  var subreddit = req.params.subredditName;
  res.send(`${subreddit}`);
});


//render ejs page
app.get("/thing/:thing", function(req, res){
  var thing = req.params.thing;
  // console.log(req.params);
  res.render("thing", {thing: thing});
});


// everything else. Order of the routes matters here.
app.get("*", function(req,res){
  res.send("You are a star");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function(){
  console.log("Server has Started");
});
