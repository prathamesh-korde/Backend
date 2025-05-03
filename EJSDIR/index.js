const express = require("express");
const path = require("path");
const app = express();
//const path = require("path");

const port= 3000;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.get("/randomNum",(req,res)=>{
    let diceVal = Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs",{diceVal});
})

app.get("/ig/:username",(req,res)=>{
   /* const follwers = ["poja","pranjali","lisha","sakshi","samrudhi","harmoni"];
    const {username} = req.params;
    res.render("instragam.ejs",{username,follwers});*/

    const {username} = req.params;
    const instadata = require("./data.json");
    const data = instadata[username];
    if(data){
        res.render("instragam.ejs",{data});
    }else{
        res.render("error.ejs");
    }
    
});

app.listen(port,()=>{
    console.log(`app listen on port no ${port}`);
    });

