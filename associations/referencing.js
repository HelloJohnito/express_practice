//Two different ways to associate models
// 1) Referencing data

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//schema
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  "Post"
  }]               // storing reference points into the user schema
});

//model
var User = mongoose.model("User", userSchema);
var Post = mongoose.model("Post", postSchema);

User.create({
  email: "johnny@g.com",
  name: "Johnny Boy"
});

//////////////////////////////////////////////////////////
//create the post, find the user, push the post, then save the user

Post.create({
  title: "How to cook the best burger",
  content: "blahhhh"
}, function(err, createdPost){
  User.findOne({email: "johnny@g.com"}, function(err2, foundUser){
    if(err){
      console.log(err2);
    } else {
      foundUser.posts.push(createdPost);
      foundUser.save(function(err3, data){
        if(err3){
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  });
});

////////////////////////////////////////////////////////////////////
//Find all posts for that user
// shows all posts

User.findOne({email: "johnny@g.com"}).populate("posts").exec(function(err, user){
  if(err){
    console.log(err);
  } else {
    console.log(user);
  }
});
