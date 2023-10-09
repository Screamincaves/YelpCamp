const mongoose = require("mongoose");
const Campground = require("../models/campground"); //require the campgrounds model created.
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Handles db connection errors
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//Return random element from array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

//Function to seed locations
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    //Gets a random number for index of array.
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6523e12469df4482fa6e8b1e",
      location: `${cities[random1000].city}, ${cities[random1000].state} `,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad aliquid maxime consectetur repudiandae minima sequi voluptates, beatae commodi a aliquam eaque repellendus. Minus ratione unde quod corrupti deserunt accusamus cupiditate.",
      price,
    });
    await camp.save();
  }
};

//Seed db then close the connection
seedDB().then(() => {
  mongoose.connection.close();
});
