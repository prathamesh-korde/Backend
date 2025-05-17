const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

const port = 8080;

async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}

main().then(res=>{
    console.log("connection to database is sucessfull");
}).catch(err=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("root page");
})

app.get("/testlisting",async (req,res)=>{
    let samplelisting = new Listing({
        title:"my deram Home",
        description:"by the mountens",
        price:10000,
        location:"pune",
        country:"india"
    });

    await samplelisting.save();
    console.log("sample was saved");
    res.send("result is saved sucessfully");

})

app.listen(port,(req,res)=>{
    console.log("sever is listning")
})