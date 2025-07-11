const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_URL = "mongodb://127.0.0.1:27017/NxtStay";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {ListingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json()); 
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/", (req, res) => {
  res.send("App is working");
});

//validateListing
const validateListing = (req, res, next) => {
  console.log("REQ BODY:", req.body); // Debug 1

  const { error } = ListingSchema.validate(req.body.Listing);
  if (error) {
    console.log("VALIDATION ERROR DETAILS:", error.details); // Debug 2
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};



const validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
 if(error){
  let errMsg = error.details.map((el)=>el.message).join(",");
  throw new ExpressError(400,errMsg);
 }else{
  next();
 }
}


//new route
app.get("/Listings/new",(req,res)=>{
    res.render("Listings/new.ejs");
})

//show route
app.get("/Listings/:id",wrapAsync(async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs",{listing})
}));

//index route
app.get("/Listings",wrapAsync(async (req,res)=>{
   const allListings = await Listing.find({})
  res.render("Listings/index.ejs", { allListings });
}));

//create
app.post("/Listings", validateListing ,wrapAsync(async (req, res, next) => {
  const newListing = new Listing(req.body.Listing);
  await newListing.save();
  res.redirect("/Listings");
}));


//edit route
app.get("/Listings/:id/edit", wrapAsync(async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("Listings/edit.ejs",{listing});
}));

//Update route
app.put("/Listings/:id",validateListing,wrapAsync( async (req, res) => {
  // if (!req.body.Listing) {
  //   throw new ExpressError(400, "Send valid data for listing");
  // }
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing }, { runValidators: true });
  res.redirect(`/Listings/${id}`);
}));

//delete route
app.delete("/Listings/:id",wrapAsync(async(req,res)=>{
  const { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  res.redirect(`/Listings`);
}));

//post route - adding reviews
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
  
}))

//Delete reviews Route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;

  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`)
}))

/*
app.get("/testListing", async (req, res) => {
  try {
    let sampleListing = new Listing({
      title: "My New Villa",
      description: "By the beach", 
      price: 6000, 
      location: "goa",
      country: "India",
    });

    await sampleListing.save();
    console.log("Sample was saved");
    res.send("Successful testing");
  } catch (err) {
    console.error("Error saving listing:", err);
    res.status(500).send("Something went wrong");
  }
});
*/


app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});



app.use((err,req,res,next) =>{
  let{status=500, message = "Something went wrong"} = err;
  //res.status(status).send(message);
  res.status(status).render("listings/error.ejs",{message});
})

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
