const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const port = 8080;

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const Chat = require("./models/chats.js");
const { name } = require("ejs");
const { nextTick } = require("process");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

main().
then((res)=>{
    console.log("connection sucessfull");
}).
catch((err) => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

/*

let chat1 = new Chat({
    from:"prathamesh",
    to:"pooja",
    msg:"send your notes",
    created_at:new Date()
})

chat1.save().then((res)=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})
*/

//index.route
app.get("/chat",async (req,res)=>{
      try{
        let chats = await Chat.find();
    res.render("index.ejs",{chats}); 
      }
      catch(err){
        next(err);
      }
})

//new chat 
app.get("/chat/new",(req,res)=>{
   // throw new ExpressError(404,"page not found");
    res.render("new.ejs");
    
})

app.post("/chat", async (req, res, next) => {
    try {
        const { from, msg, to } = req.body;
        let newChat = new Chat({
            from,
            msg,
            to,
            created_at: new Date(),
        });
        await newChat.save(); 
        console.log("Data added successfully");
        res.redirect("/chat");
    } catch (err) {
        next(err);
    }
});

//asyncWrap function
function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((req,res,next) => next(err));
    }
}


//New- Show route
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
    
        let{id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        next(new ExpressError(404,"chat not found"));
    }
    res.render("edit.ejs",{chat});
}));

//Edit route 
app.get("/chat/:id/edit",async (req,res)=>{
    try{
        let {id} = req.params;
   let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
    }
    catch(err){
        next(err);
    }
})

//update route
app.put("/chat/:id", async (req, res) => {
    try{
        const { id } = req.params; // Destructure the actual id
    const { msg } = req.body;

    try {
        let updatedChat = await Chat.findByIdAndUpdate(
            id,
            { msg: msg },
            { runValidators: true, new: true } ,
            {new:true},
        );
        res.redirect("/chat");
    } catch (err) {
        console.error("Error updating chat:", err);
        res.status(500).send("Internal Server Error");
    }
    }
    catch(err){
        next(err);
    }
});


//destroy route
app.delete("/chat/:id",async (req,res)=>{
    try{
        const { id } = req.params;
     const deleatedChat= await Chat.findByIdAndDelete(id);
     res.redirect("/chat");
    }
    catch(err){
        next(err);
    }
})

app.get("/",(req,res)=>{
    res.send("root is working");
})

// error-handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Some error occurred" } = err;
    res.status(status).send(message);
});


app.listen(port,(req,res)=>{
    console.log("server is working");
})