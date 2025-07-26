const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_URL = "mongodb://127.0.0.1:27017/NxtStay";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_URL);
}

const initDB = async () =>{
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"6884d358c4438591b0b43a0d"}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
}

initDB();