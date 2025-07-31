const Listing = require("../models/listing.js");

module.exports.index = 
    async (req,res)=>{
   const allListings = await Listing.find({})
  res.render("listings/index.ejs", { allListings });
}

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.Listing);
  
  if (req.file) {
    newListing.image = {
      url: req.file.path,        
      filename: req.file.filename 
    };
  }

  newListing.owner = req.user._id;

  await newListing.save();
  req.flash("success", "New listing added successfully!");
  res.redirect("/listings");
};


module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path:"reviews",
    populate:{
      path:"author"
    }
  })
  .populate("owner");
  if (!listing) {
    req.flash("error", "The listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
}

module.exports.editListing = async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  req.flash("success", "listing is Edited successfully!");
  if (!listing) {
    req.flash("error", "The listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }

  let originalUrl = listing.image.url;
  originalUrl = originalUrl.replace("/upload","/upload/w_250")
  res.render("listings/edit.ejs",{listing,originalUrl});
}

module.exports.updateListing = async (req, res) => {
   const { id } = req.params;

  if (!req.body.Listing) {
    throw new ExpressError(400, "Invalid listing data");
  }

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "listing is updated successfully!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res)=>{
  const { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleated successfully!");
  res.redirect(`/listings`);
}