const express = require("express");
const app = express();
let port = 3000;//8080 and 3000 used to make custum servers
console.dir(app);
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
});


/*
app.use((req,res)=>{
    console.log("request recived");
   // console.log(req); //(express automatically convert text message into an object)
   // console.log(res);
   
  // res.send({
  //  "name":"prathamesh",
   // "branch":"IT",
  // });

   
//can't send multiple responce for same path

   let HTMLCode="<h1>Fruits</h1><ul><li>orange</li><li>apple</li><li>banana</li></ul>";
   res.send(HTMLCode);
})
   */


app.get("/",(req,res)=>{
    res.send(`welcome to the root page.`);
});

app.get("/:username/:id",(req,res)=>{
    let{username , id} = req.params;
    let htmlString = `<h1>welcome to the page of ${username}</h1>`
    res.send(htmlString);
});

app.get("/orange",(req,res)=>{
    res.send("you can contacted orange path");
});

app.get("/apple",(req,res)=>{
    res.send("you can contacted apple path");
});

app.get("/banana",(req,res)=>{
    res.send("you can contacted banana path");
});


