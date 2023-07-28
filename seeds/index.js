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
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state} `,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
};

//Seed db then close the connection
seedDB().then(() => {
  mongoose.connection.close();
});
