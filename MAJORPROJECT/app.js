const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_URL = "mongodb://127.0.0.1:27017/NxtStay";


main().then(()=>{
    console.log("connected to DB")
}).catch(err=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongo_URL);
}

app.get("/",(req,res)=>{
    res.send("app is working");
})

app.listen(8080,()=>{
    console.log("server listning on port 8080");
})