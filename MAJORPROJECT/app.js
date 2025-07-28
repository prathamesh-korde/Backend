if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_URL = "mongodb://127.0.0.1:27017/NxtStay";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
var Session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport")
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const {ListingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
 
const Listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const UserRoute = require("./routes/user.js");

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json()); 
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const options = {
  secret: "superSecret",
  resave: false,
  saveUninitialized: false, 
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};


app.get("/", (req, res) => {
  res.send("App is working");
});

app.use(Session(options));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.Curruser = req.user;
  next();
});

// app.get("/demouser", async (req, res) => {
//   try {
//     let fakeUser = new User({
//       email: "pratham0123@gmail.com", 
//       username: "pratham",
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld"); 
//   } catch (e) {
//     res.status(500).send(e.message); 
//   }
// });

app.use("/Listings",Listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",UserRoute);


app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err,req,res,next) =>{
  let{status=500, message = "Something went wrong"} = err;
  res.status(status).render("listings/error.ejs",{message});
})

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});




