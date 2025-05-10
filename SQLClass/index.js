const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const { url } = require('inspector');
const { connect } = require('http2');
const { Console } = require('console');

const app = express();
let port = 8080;

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'it',
    password:'Psk@rde123'
  });


  let getRandomUser = () => {
    return [
      faker.string.uuid(),
       faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password(),
    ];
  }
  
  /*
let q = "INSERT INTO stu VALUES ?";

let tech = [
  ["455", "etmc", "sillammcon@example.com", "frhhc"],
  ["46", "cs_depm", "cs@mm455.com", "cvf,mvg"]
];

connection.query(q, [tech], function(err, results) {
  if (err) {
    console.error("Insertion error:", err);
    return;
  }
  console.log("Inserted rows:", results.affectedRows);
});

*/


/*
let data = [];
for(let i=0;i<100;i++){
  data.push(getRandomUser());
}
  */

// connection.end();


//Home rout
app.get("/Home",(req,res)=>{
  let q = "select count(*) from stu";
  try{
    connection.query(q,(err,results) =>{
      if(err){
        throw err;
      }
      let count = results[0]["count(*)"];

    res.render("home.ejs",{count});
  }
);
}
  catch(err){
    console.log(err);
    res.render("some error in database");
  }
})



//show route
app.get("/Home/user",(req,res)=>{
  let q = "select * from stu";
try{
  connection.query(q,(err, users)=> {
    if(err){
      throw err;
    }
    res.render("show.ejs",{users});
  } 
);
}
catch(err){
  console.log(err);
  res.render("some error in database");
}
  
})


//edit rout
app.get("/Home/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from stu where id ='${id}'`;
  
  try{
  connection.query(q,(err, results)=> {
    if(err){
      throw err;
    }
    let user = results[0];
    res.render("Edit.ejs",{user});
  } 
);
}
catch(err){
  console.log(err);
  res.send("some error in database");
}

});

//Delete rout


app.get("/Home/user/:id",(req,res)=>{


  let { id } = req.params;
  let q = `select * from stu where id ='${id}' `;

  try{
  connection.query(q,(err, users)=> {
    if(err){
      throw err;
    }
    res.render("Delete.ejs",{users});
  } 
);
}
catch(err){
  console.log(err);
  res.render("some error in database");
}
})


app.delete("/Home/user/:id", (req, res) => {
  let { id } = req.params;
  let { email: FormEmail, password: formpass } = req.body;
  console.log(FormEmail);
  
  let q = `select * from stu where id ='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(FormEmail);
      console.log(user.email);
      if(user.PASSWORD != formpass){
        res.send("wrong Email or Password plese try again");
      }else{
        let q2 = `DELETE FROM stu WHERE id ='${id}'`;
        connection.query(q2,(err,output)=>{
          if(err) throw err;
          res.redirect("/Home/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//Update rout

app.patch("/Home/user/:id", (req, res) => {
  let { id } = req.params;
  let { username: formnmae, password: formpass } = req.body;
  let q = `select * from stu where id ='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if(user.PASSWORD != formpass){
        res.send("wrong password");
      }else{
        let q2 = `update stu set userNmae = '${formnmae}' where id ='${id}' `;
        connection.query(q2,(err,output)=>{
          if(err) throw err;
          res.redirect("/Home/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

//get use data

app.get("/Home/user/add",(req,res)=>{
  res.render("new.ejs");
})

//add new user
app.post("/Home/user/add",(req,res)=>{
  const { username, email, password } = req.body;
  let q =  `INSERT INTO stu VALUES (
  '${faker.string.uuid()}',
  '${username}',
  '${email}',
  '${password}'
)`;


   try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/Home/user");
    });
  }
   catch (err) {
    console.log(err);
    res.send("some error in database");
  }

})

app.listen(port,()=>{
  console.log(`app was listning on port ${port}`);
} )