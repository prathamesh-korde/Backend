const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts=[
    {
        id:uuidv4(),
        username: "prathamesh",
        content:"hii i am Ex Navodayan"
    },
    {
        id:uuidv4(),
        username:"pritesh",
        content:"hii i'm from Tumsar"
    },
    {
        id:uuidv4(),
        username:"onkar",
        content:"consistency is key to success"
    }
]

app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/post",(req,res)=>{
    const {username,content} = req.body;
    const id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/post");
})

app.get("/post/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    res.render("show.ejs",{post});
})

app.patch("/post/:id", (req, res) => {
    let {id} = req.params;
    let Updcontent = req.body.content;
    let post = posts.find((p)=> id== p.id);
    post.content = Updcontent; 
    console.log(post);
    res.send("patch is working");
});

app.get("/post/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id == id);
    res.render("edit.ejs", { post });
});


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});