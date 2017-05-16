var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// app.use(express.static(__dirname + '/public'));
app.use(express.static("style"));
//you don;t have to write ejs files in render
app.set("view engine", "ejs");

//tell express to use body parser
app.use(bodyParser.urlencoded({extended: true}));


////////// Routes////////////////
//get
app.get("/", function(req, res){
  res.render("homepage"); //home.ejs is off bc app.set
});

//render ejs page
app.get("/thing/:thing", function(req, res){
  var thing = req.params.thing;
  // console.log(req.params);
  res.render("thing", {thing: thing});
});


// everything else. Order of the routes matters here.
// app.get("*", function(req,res){
//   res.send("You are a star");
// });

var friends = ["John", "Aaron"];
//get
app.get('/friends', function(req, res){
  res.render("friends", {friends: friends});
});

//POST//
app.post("/addfriend", function(req, res){
  //newfriend is from the name attr on input.
  //req.body needs body parser.
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function(){
  console.log("Server has Started");
});
