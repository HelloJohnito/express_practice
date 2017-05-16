var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("search");
});

//using request to call api movies.
app.get("/movies", function(req, res){
  var userSearch = req.query.search;
  var url = `http://www.omdbapi.com/?s=${userSearch}`;
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var data = JSON.parse(body);
      res.render("movies", {movieData: data});
    }
  });
});


app.listen(3000, function(){
  console.log("Server has Started");
});
