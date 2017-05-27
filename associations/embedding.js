//Two different ways to associate models
// 1) Embedding

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


//IMPORTANT postSchema needs to be created before userSchema
//schema
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [postSchema]               // Embedding data into the user schema
});

//model
var User = mongoose.model("User", userSchema);
var Post = mongoose.model("Post", postSchema);


///////////////////////////////////////////////////////////
//create, push the post, then save

var newUser = new User({
  email: "john@johnjohn.com",
  name: "john",
});

newUser.posts.push({
  title: "How to fly",
  content: "get a dragon"
});

newUser.save(function(err, user){
  if(err){
    console.log(err);
  } else {
    console.log(user);
  }
});
////////////////////////////////////////////////////////
//find the user, push the post, then save

User.findOne({name: "john"}, function(err, user){
  if(err){
    console.log(err);
  } else {

    user.posts.push({
      title: "another way to push",
      content: "we are first finding the user than pushing the post."
    });

    user.save(function(err2, userWithPost){
      if(err){
        console.log(err2);
      } else {
        console.log(userWithPost);
      }
    });
  }
});
