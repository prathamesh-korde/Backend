const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title:{
    type : String,
    
  },
  description : String,
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://s4.arizona.edu/sites/default/files/styles/az_full_width_bg_large/public/2025-04/AdobeStock_302537769.jpeg.webp?itok=0pqgaB4V"
    }
  },
  price : Number,
  location : String,
  country : String,
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;