const express = require("express");
const app = express();
let port = 3000;//8080 and 3000 used to make custum servers
console.dir(app);
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
});