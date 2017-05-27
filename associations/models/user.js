var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  "Post"
  }]               // storing reference points into the user schema
});

module.exports = mongoose.model("User", userSchema);
