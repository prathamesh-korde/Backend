const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_URL = "mongodb://127.0.0.1:27017/NxtStay";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");


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

app.get("/", (req, res) => {
  res.send("App is working");
});


//new route
app.get("/Listings/new",(req,res)=>{
    res.render("Listings/new.ejs");
})

//show route
app.get("/Listings/:id",async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing})
})


//index route
app.get("/Listings",async (req,res)=>{
   const allListings = await Listing.find({})
  res.render("Listings/index.ejs", { allListings });
})

//create
app.post("/Listings", async (req, res) => {
 //let{title , description , image , price , location , country} = req.body;
 let newListing = new Listing(req.body.Listing);
 newListing.save();
 res.redirect("/Listings");
})

//edit route
app.get("/Listings/:id/edit", async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("Listings/edit.ejs",{listing});
})

//Update route
app.put("/Listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing }, { runValidators: true });
  res.redirect(`/Listings/${id}`);
});

//delete rpute
app.delete("/Listings/:id",async(req,res)=>{
  const { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  res.redirect(`/Listings`);
})

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
