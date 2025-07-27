const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const {islogin,isOwner,validateListing} = require("../middleware.js");
const listingControler = require("../controllers/listing.js");
const { route } = require("./user.js");
const multer  = require('multer')
const upload = multer({ dest: 'MAJORPROJECT/uploads/' })


//new route

router
.route("/")
//index route
.get(wrapAsync(listingControler.index))
//create
//.post(islogin,validateListing,wrapAsync(listingControler.createListing))
.post(upload.single('Listing[image]'),(req,res)=>{
    res.send(req.file);
})

router.get("/new",islogin,(req,res)=>{
    res.render("Listings/new.ejs");
})


router
.route("/:id")
//Show route
.get(wrapAsync(listingControler.showListing))
//Update route
.put(islogin,isOwner,wrapAsync(listingControler.updateListing))
//delete route
.delete(islogin,isOwner,wrapAsync(listingControler.destroyListing));


//edit route
router.get("/:id/edit",islogin,islogin,wrapAsync(listingControler.editListing));


module.exports = router;

