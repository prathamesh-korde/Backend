const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {ListingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const {islogin} = require("../middleware.js");

//validateListing
const validateListing = (req, res, next) => {
  let {error } = ListingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//new route
router.get("/new",islogin,(req,res)=>{
    res.render("Listings/new.ejs");
})

//Show route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews").populate("owner");

  if (!listing) {
    req.flash("error", "The listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}));


//index route
router.get("/",wrapAsync(async (req,res)=>{
   const allListings = await Listing.find({})
  res.render("listings/index.ejs", { allListings });
}));

//create
router.post("/",islogin,validateListing,wrapAsync(async (req, res, next) => {
  const newListing = new Listing(req.body.Listing);
  console.log(req.user);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New listing added successfully!");
  res.redirect("/listings");
}));


//edit route
router.get("/:id/edit", islogin,wrapAsync(async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);req.flash("success", "listing is Edited successfully!");
  if (!listing) {
    req.flash("error", "The listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit",{listing});
}));


//Update route
router.put("/:id",islogin,wrapAsync( async (req, res) => {

  if (!req.body.Listing) {
  throw new ExpressError(400, "Invalid listing data");
}

  const { id } = req.params;
  let list = await Listing.findById(id);
  if(! res.locals.Curruser._id.equals(list.owner._id)){
    req.flash("error","You don't have permission to edit!");
    return res.redirect(`/listings/${id}`);
  }
  
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing }, { runValidators: true });
  req.flash("success", "listing is updated successfully!");
  res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",islogin,wrapAsync(async(req,res)=>{
  const { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleated successfully!");
  res.redirect(`/listings`);
}));


module.exports = router;