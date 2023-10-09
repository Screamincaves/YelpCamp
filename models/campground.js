const mongoose = require("mongoose");
const Review = require("./review");
//Variable for schema - shortcut so can reference value shorthand.
const Schema = mongoose.Schema;

//Campground schema for mongoose
const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

//Export model to be compiled, passes name and schema
module.exports = mongoose.model("Campground", CampgroundSchema);
