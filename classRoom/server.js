const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");


app.use(cookieparser("secure"));

app.get("/securecookie",(req,res)=>{
    res.cookie("namaste","india",{signed:true});
    res.send("secure cookie send")
})

app.get("/varify",(req,res)=>{
   console.log(req.signedCookies);
     res.send("verifed sucessfully");
})


app.get("/getcookies",(req,res)=>{
    res.cookie("namaste","india");
    res.cookie("name","prathamesh");
    res.send("cookie is submited");
})

app.get("/greed",(req,res)=>{
    let {name = "unknown"} = req.cookies;
    res.send(`hii ${name}`);
})

app.get("/",(req,res)=>{
    console.dir(req.cookies);
})
   
app.listen(3000, () => {
  console.log("Server listening on port 8080");
});

