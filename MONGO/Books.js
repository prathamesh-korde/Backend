const mongoose = require('mongoose');

main().
then((res)=>{
    console.log("connection sucessfull");
}).
catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}


const bookSchema = new mongoose.Schema({
    title:{
    type:String,
    required:true,
    maxLength:15
    
},
    author:String,
    prise:{
        type:Number,
        min:[1,"prise is to low for amazon selling"],
    },
    discount:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        enum : ["fiction","non-fiction"],
    },
    genre:[String],
})


//form a collection
const Book = mongoose.model("Books",bookSchema);

/*
let book8 = new Book({
    title:"manga comics",
    author:"chetan bhagat",
    prise:"75",
    category:"fiction",
    genre:["comics","superheroes","fiction"]
});

book8.save().then(res=>{
    console.log(res);
}).catch(err=>{
console.log(err);
})

*/

Book.findByIdAndUpdate('6822d21da8ed158616b3c044',{prise:0} , {runValidators:true}).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err.errors.prise.properties.message);
})
