const mongoose = require('mongoose');

main().
then((res)=>{
    console.log("connection sucessfull");
}).
catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new  mongoose.Schema({
    name:String,
    email:String,
    age:Number
});



const User = mongoose.model("User",userSchema);
//const Employee = mongoose.model("Employee",userSchema);

/*
User.updateMany({age:{$gt:45}},{age:40}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(res);
})
    */

/*
User.findOneAndUpdate({name:"peter"},{age:20} ).then(res=>{
    console.log(res);
})
    */



  User.findByIdAndDelete('682205ab7e63528855e9194c').then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err);
  })
    

/*
User.findOne({_id:'6821ebb3f453916d45f11005'}).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})

*/

/*
User.findById('6821ebb3f453916d45f11005').then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})

*
/*
//Insert One
const user1 = new User({
    name:"Eve",
    email:"Eve420@gmail.com",
    age:50,
})

user1.save().then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err);
})
    */


/*
User.insertMany([
    {name:"tony",email:"jarvise01@gmail.com",age:49},
    {name:"peter",email:"pearterparker@hmail.com",age:26},
    {name:"bruse",email:"bruceBanner@gmail.com,age:45"}
]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err);
})
    */

