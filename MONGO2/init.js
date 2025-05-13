const mongoose = require("mongoose");
const Chat = require("./models/chats.js");
const { application } = require("express");

main().
then((res)=>{
    console.log("connection sucessfull");
}).
catch((err) => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

 allChats=[
    {
    from:"prathamesh",
    to:"pritesh",
    msg:"send your notes",
    created_at:new Date()
    },
    {
        from:"pram",
        to:"prathamesh",
        msg:"hellow!",
        created_at:new Date(),
    },
    {
        from:"ram",
        to:"sham",
        msg:"all the best for exam",
        created_at:new Date(),
    },
    {
        from:"sita",
        to:"gita",
        msg:"hellow !",
        created_at: new Date(),
    }
 ];

 Chat.insertMany(allChats);
