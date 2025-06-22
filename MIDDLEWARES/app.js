const express = require("express");
const app = express();

const port = 3000;
//middleware --> responce send


//path is not difined it will send the same responce to each incomming request
app.use("/",(req,res,next)=>{
   
    console.log("Hi ,i am 1st middleware");
    /*
     let {query} = req.query;
    console.log(query);
    */
   next();
    console.log("this is after next");
    //next is not stop the next flow of execution bet generally not prefered to write somthing after thr next() 
    //else programmer preffered to return next();
})

app.use((req,res,next)=>{
    console.log("hii, im 2nd middleware")
    return next();
    console.log("stop flow of execution");
})

app.get("/",(req,res)=>{
    res.send("Hi i am root.");
})

app.get("/random",(req,res) =>{
    res.send("this is random page");
})

app.listen(port,(req,res)=>{
    console.log(`server is listning on port ${port}`);
})