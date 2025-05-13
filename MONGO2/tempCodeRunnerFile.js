const express = require("express");
const app = express();

const port = 8080;

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const Chat = require("./models/chats.js");
const { name } = require("ejs");

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
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
})

//new chat 
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chat",(req,res) =>{
    const {from , msg , to} = req.body;
    let newChat = new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    })
    newChat.save().then((res)=>{
        console.log("data added sucessfully");
    }).catch(err=>{
        console.log(err);
    })

    res.redirect("/chat");
})

//Edit route 
app.get("/chat/:id/edit",async (req,res)=>{
    let {id} = req.params;
   let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chat/:id", async (req, res) => {
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
});


//destroy route
app.delete("/chat/:id",async (req,res)=>{
    const { id } = req.params;
     const deleatedChat= await Chat.findByIdAndDelete(id);
     res.redirect("/chat");
})

app.get("/",(req,res)=>{
    res.send("root is working");
})

app.listen(port,(req,res)=>{
    console.log("server is working");
})