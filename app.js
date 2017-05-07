var express = require("express");
var app = express();


// Routes
app.get("/", function(req, res){
  console.log("Someone went on your site");
  res.send("Hi there!");
});

app.get("/bye", function(req,res){
  res.send("Goodbye!");
});

//everything else. Order of the routes matters here. 
app.get("*", function(req,res){
  res.send("You are a star");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function(){
  console.log("Server has Started");
});
