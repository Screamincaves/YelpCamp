const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schemas.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground"); //require the campgrounds model created.
const Review = require("../models/review");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
