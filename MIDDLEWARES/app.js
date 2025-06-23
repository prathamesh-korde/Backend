const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const port = 3000;
//middleware --> responce send

/*
//path is not difined it will send the same responce to each incomming request
app.use("/",(req,res,next)=>{
   
    console.log("Hi ,i am 1st middleware");
    
    // let {query} = req.query;
   // console.log(query);
   
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

*/
//Utility middlewares

/*
//Logger
app.use((req,res,next)=>{
    req.time = Date.now();
  // req.date = new Date(Date.now()).toISOString();
    console.log(req.method,req.hostname,req.path,req.time,req.date);
    next();
})
//middlewares must be are write at starting of code as if path matches any of the route the rsponce will be send and we loss the acces of req,res object
*/


//basic functionaliy of middleware as authantication
const checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new ExpressError( 401 ,"Access Denied !");
};

// app.get("/app",checkToken,(req,res)=>{
//     res.send("data");
//     next();
// })
//express come with build in error handler that handle any error that 
// comes in app it's an middleware function which add at the end of middleware function stack

app.get("/err",(req,res)=>{
    abcd = abcd;
})

app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"Access to admin is forbidden")
})

app.use((err,req,res,next)=>{
   // console.log("-----Error-----");
   let {status = 500, message = "some error occurs"} = err;
    res.status(status).send(message);
})

// app.use((err,req,res,next)=>{
//     console.log("-------Error2-------");
//     next(err);
// })


/*
app.get("/",(req,res)=>{
    res.send("Hi i am root.");
})

app.get("/random",(req,res) =>{
    res.send("this is random page");
})
    */

// app.use((req,res)=>{
//     res.status(404).send("page not found Error:404");
// })

app.listen(port,(req,res)=>{
    console.log(`server is listning on port ${port}`);
})