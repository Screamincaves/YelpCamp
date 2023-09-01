const mongoose = require("mongoose");
const Schema = moongoose.schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});



module.exports = mongoose.model("Review", reviewSchema);
