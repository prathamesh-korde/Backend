const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview,islogin,isReviewAuthor} = require("../middleware.js");


//post route - adding reviews
router.post("/",islogin,validateReview, wrapAsync(async (req, res) => {

  if (!req.body.review) {
    throw new ExpressError(400, "Invalid review data");
  }

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);


  newReview.author = req.user._id;
  

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New Review added successfully!");

  res.redirect(`/listings/${listing._id}`);
}));


//Delete reviews Route
router.delete("/:reviewId",islogin,isReviewAuthor, wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleated successfully!");

  res.redirect(`/listings/${id}`)
}))

module.exports = router;
