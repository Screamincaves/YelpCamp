const mongoose = require("mongoose");
//Variable for schema - shortcut so can reference value shorthand.
const Schema = mongoose.Schema;

//Campground schema for mongoose
const CampgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

//Export model to be compiled, passes name and schema
module.exports = mongoose.model("Campground", CampgroundSchema);
