const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_URL = "mongodb://127.0.0.1:27017/NxtStay";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const {ListingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

const Listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

app.use("/Listings",Listings);
app.use("/listings/:id/reviews",reviews);

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




