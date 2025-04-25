const express = require("express");
const app = express(); // <-- add the parentheses here!

const port = 8080;

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.send("this is home");
})
app.listen(port, () => {
    console.log(`listening on port no ${port}`);
});
