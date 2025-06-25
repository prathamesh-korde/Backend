const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title:{
    type : String,
    
  },
  description : String,
  image: { filename: String, 
    url: {
      type: String,
      default: "https://cdn.create.vista.com/api/media/medium/8691703/stock-photo-suburban-home-with-front-porch?token=" // <-- Default image URL
    },
   }
,
  price : Number,
  location : String,
  country : String,
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;