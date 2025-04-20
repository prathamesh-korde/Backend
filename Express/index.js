const express = require("express");
const app = express();
let port = 3000;//8080 and 3000 used to make custum servers
console.dir(app);
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
});
app.use((req,res)=>{
    console.log("request recived");
   // console.log(req); //(express automatically convert text message into an object)
   // console.log(res);
   /*
   
   res.send({
    "name":"prathamesh",
    "branch":"IT",
   });

   */


   let HTMLCode="<h1>Fruits</h1><ul><li>orange</li><li>apple</li><li>banana</li></ul>";
   res.send(HTMLCode);

   

})
