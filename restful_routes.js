var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//for overwriting puts and deletes.
var methodOverride = require("method-override");

//
var expressSanitizer = require('express-sanitizer');


//APP CONFIG
//body parsing for express
app.use(bodyParser.urlencoded({extended: true}));
//css files
//public/stylesheets
app.use(express.static("public"));

//overrides for puts and delete
app.use(methodOverride("_method"));

//prevents users to insert script tags
app.use(expressSanitizer());


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

//new
app.get('/blogs/new', function(req,res){
  res.render('new');
});

//create
app.post('/blogs', function(req,res){
  //prevents users to insert script tags
  req.body.blog.body = req.sanitize(req.body.blog.body);

  //in the views: name="blog[title]" reason why req.body.blog
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.render("new");
    }else {
      res.redirect("/blogs");
    }
  });
});

//show
app.get('/blogs/:id', function(req,res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

//edit
app.get('/blogs/:id/edit', function(req,res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    } else {
      res.render("edit", {blog: foundBlog});
    }
  });
});

//update

//methodOverride
//in views: in form action: ?_method= PUT

app.put("/blogs/:id", function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
    if(err){
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs" + req.params.id);
    }
  });
});


//delete
// <form action=".blogs<%=blog._id%>?_method=DELETE" method="POST" >
app.delete("/blogs/:id", function(req,res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});


app.listen(3000, function(){
  console.log("Server has started");
});
