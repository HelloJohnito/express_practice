var express = require("express");
var app = express();


// Routes
app.get("/", function(req, res){
  res.send("Hi there!");
});

app.get("/bye", function(req,res){
  res.send("Goodbye!");
});

//anything can go inside subredditName.
app.get("/r/:subredditName", function(req, res){
  var subreddit = req.params.subredditName;
  res.send(`${subreddit}`);
});

//everything else. Order of the routes matters here.
app.get("*", function(req,res){
  res.send("You are a star");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function(){
  console.log("Server has Started");
});
