app.get("/app",checkToken,(req,res)=>{
    res.send("data");
    next();
})