app.all("*",(req,res,next)=>{
  next(ExpressError(404,"page not found"));
})