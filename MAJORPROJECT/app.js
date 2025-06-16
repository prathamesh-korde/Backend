const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_URL = "mongodb://127.0.0.1:27017/NxtStay";
const Listing = require("./models/listing.js");
const path = require("path");

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

app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("App is working");
});


//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//index route
app.get("/Listings",async (req,res)=>{
   const allListings = await Listing.find({})
  res.render("listings/index.ejs", { allListings });
})

//create
app.post("/listings", async (req, res) => {
 let listing = res.body.listing;
 console.log(listing);

});


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

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
