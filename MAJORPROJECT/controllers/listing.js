const Listing = require("../models/listing.js");

module.exports.index = 
    async (req,res)=>{
   const allListings = await Listing.find({})
  res.render("listings/index.ejs", { allListings });
}

module.exports.createListing = async (req, res, next) => {
  let url = req.file,path;
  let filename = req.file.filename;

  console.log(url,"..",filename);

  const newListing = new Listing(req.body.Listing);
  console.log(req.user);
  // newListing.owner = req.user._id;
  // newListing.image={url,filename};
  // await newListing.save();
 req.flash("success", "New listing added successfully!");
  res.redirect("/listings");
}

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
  console.log(listing);
  res.render("listings/show.ejs", { listing });
}

module.exports.editListing = async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);req.flash("success", "listing is Edited successfully!");
  if (!listing) {
    req.flash("error", "The listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit",{listing});
}

module.exports.updateListing = async (req, res) => {
   const { id } = req.params;
  if (!req.body.Listing) {
  throw new ExpressError(400, "Invalid listing data");
} 
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing }, { runValidators: true });
  req.flash("success", "listing is updated successfully!");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res)=>{
  const { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleated successfully!");
  res.redirect(`/listings`);
}