const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signUpUser=async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        }

        req.flash("success", "Welcome to NxtStay!");
      res.redirect("/listings");
      })
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

  module.exports.renderLodinForm = (req,res)=>{
  res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
  req.flash("success", "Welcome back to NxtStay!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl)
}

module.exports.logout = (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","You have successfully logged out from NxtStay!")
    res.redirect("/listings");
  })
}
