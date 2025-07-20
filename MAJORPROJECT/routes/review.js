const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

//validateReview 
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//post route - adding reviews
router.post("/",validateReview, wrapAsync(async (req, res) => {

  if (!req.body.review) {
    throw new ExpressError(400, "Invalid review data");
  }

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New Review added successfully!");

  res.redirect(`/listings/${listing._id}`);
}));


//Delete reviews Route
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleated successfully!");

  res.redirect(`/listings/${id}`)
}))

module.exports = router;
