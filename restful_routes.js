var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//APP CONFIG
//body parsing for express
app.use(bodyParser.urlencoded({extended: true}));
//css files
app.use(express.static("public"));
app.set("view engine", "ejs");
//mongoose set up
mongoose.connect("mongodb://localhost/routes_app");


//MODEL CONFIG
var blogSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


//ROUTES

app.get('/', function(req,res){
  res.redirect('/blogs');
});

//index
app.get('/blogs', function(req,res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("ERROR IN INDEX");
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});


app.listen(3000, function(){
  console.log("Server has started");
});
