//Mongoose is an ODM Object Data Mapper
//Way for us to write Javascript that interacts with Mongo

var mongoose = require("mongoose");
mongoose.Promise = global.Promise; //gets rid of the promise deprecation error message
mongoose.connect("mongodb://localhost/practice");

//creates the schema
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

//creates the model
var Cat = mongoose.model("Cat", catSchema);


//adding a cat to the DB
var george = new Cat({
  name: "George",
  age: 11,
  temperament: "Grouchy"
});

//save with a callback to check if there is an error
//getting a promise deprecation error //solved with line 5
george.save(function(err, cat){
  if(err){
    console.log("ERROR");
  } else {
    console.log("Cat Saved");
    console.log(cat);
  }
});


//Create which creates a new cat and saves at once.
Cat.create({
  name: "Snow",
  age: 15,
  temperament: "nice"
}, function(err, cat){
  if(err){
    console.log(err);
  } else {
    console.log(cat);
  }
});

//retrieve all cats from the db
Cat.find({}, function(err, cats){
  if(err){
    console.log("Error");
    console.log(err);
  } else {
    console.log("All cats");
    console.log(cats);
  }
});
