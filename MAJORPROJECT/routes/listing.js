const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {ListingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");


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
router.get("/new",(req,res)=>{
    res.render("Listings/new.ejs");
})

//show route
router.get("/:id",wrapAsync(async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if(!listing){
    req.flash("error", "Listing you requisted is does't exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs",{listing})
}));

//index route
router.get("/",wrapAsync(async (req,res)=>{
   const allListings = await Listing.find({})
  res.render("listings/index.ejs", { allListings });
}));

//create
router.post("/",validateListing,wrapAsync(async (req, res, next) => {
  const newListing = new Listing(req.body.Listing);
  await newListing.save();
  req.flash("success", "New listing added successfully!");
  res.redirect("/listings");
}));


//edit route
router.get("/:id/edit", wrapAsync(async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);req.flash("success", "listing is Edited successfully!");

  res.render("listings/edit",{listing});
}));


//Update route
router.put("/:id",wrapAsync( async (req, res) => {

  if (!req.body.Listing) {
  throw new ExpressError(400, "Invalid listing data");
}

  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing }, { runValidators: true });
  req.flash("success", "listing is updated successfully!");
  res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
  const { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleated successfully!");
  res.redirect(`/listings`);
}));

module.exports = router;