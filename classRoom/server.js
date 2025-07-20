const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const cookieparser = require("cookie-parser");
const session = require("express-session");
app.use(cookieparser("secure"));
var Session = require('express-session');
var flash = require('connect-flash');

const options = {
    secret : "secretWork",
    resave : false,
    saveUninitialized:true
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(Session(options));
app.use(flash());


app.use((req,res,next) =>{
    res.locals.sucess = req.flash("sucess");
    res.locals.error = req.flash("error");
    next();
})
app.use("/registor",(req,res)=>{
    const {name = "anonymos"} = req.query;
    req.session.name = name;
    if(name=="anonymos"){
        req.flash("error","user not registered");
    }else{
        req.flash("sucess","user registered sucessfully");
    }
    res.redirect("/hellow");
})

app.use("/hellow",(req,res)=>{
    res.render("./user.ejs",{name : req.session.name});
})

// app.get("/reqcount",(req,res)=>{
//     if(!req.session.count){
//         req.session.count =1;
//     }else{
//         req.session.count++;
//     }
     
//     res.send(`session is activeted ${req.session.count} times`);
// })

// app.get("/securecookie",(req,res)=>{
//     res.cookie("namaste","india",{signed:true});
//     res.send("secure cookie send")
// })

// app.get("/varify",(req,res)=>{
//    console.log(req.signedCookies);
//      res.send("verifed sucessfully");
// })


// app.get("/getcookies",(req,res)=>{
//     res.cookie("namaste","india");
//     res.cookie("name","prathamesh");
//     res.send("cookie is submited");
// })

// app.get("/greed",(req,res)=>{
//     let {name = "unknown"} = req.cookies;
//     res.send(`hii ${name}`);
// })

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
// })
   
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

