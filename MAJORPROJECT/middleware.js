
module.exports.islogin = (req,res,next)=>{
     if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
    req.flash("error", "User must Login before add new listing!");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedtecturl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}