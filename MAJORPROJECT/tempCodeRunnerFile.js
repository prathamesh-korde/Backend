app.delete("/Listings/:id",wrapAsync(async(req,res)=>{
  const { id } = req.params;
  let deleatedListing = await Listing.findByIdAndDelete(id);
  res.redirect(`/Listings`);
}));