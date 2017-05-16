var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/movies", function(req, res){
  request("http://www.omdbapi.com/?s=star", function(error, response, body){
    if(!error && response.statusCode === 200){
      var data = JSON.parse(body);
      res.render("movies", {movieData: data});
    }
  });
});


app.listen(3000, function(){
  console.log("Server has Started");
});
