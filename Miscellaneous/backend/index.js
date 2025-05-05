const express = require("express");
const app = express();

const port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/register", (req, res) => {
    let{user,password} = req.query;
    res.send(`Standard get Responce . Welcome ${user}!`);
});

app.post("/register", (req, res) => {
    let{user,password} = req.body;
    res.send(`Standard post Responce.Welcome ${user}!`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
