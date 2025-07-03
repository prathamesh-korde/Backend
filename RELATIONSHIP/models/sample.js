const mongoose = require("mongoose");
const { Schema } = mongoose;


const mongoport = 'mongodb://127.0.0.1:27017/relationDemo';
async function main() {
    await mongoose.connect(mongoport);
}

main().then(()=>{
    console.log("connection sucessfull");  
}).catch(err=>{
    console.log(err);
})


//Modules


const orderSchema1 = new Schema({
    name:String,
    price : Number
})

const Order = mongoose.model("oder",orderSchema1);

const customerSchema1 = new Schema({
    name:String,
    orders:[{
         type:Schema.Types.ObjectId,
         ref:Order,
    }]
})



const Customer = mongoose.model("Customer",customerSchema1);

const addCustomer = async()=>{
    let cust1 = new Customer({
        name:"tony",
    })

    let order1 = await Order.findOne({item:"dosa"});
    let order2 = await Order.findOne({item:"kit-kat"});

     if (order1) cust1.orders.push(order1);
    if (order2) cust1.orders.push(order2); 

    
    let result = await cust1.save();
    console.log(result);
}

addCustomer();

// const addOrders = async()=>{
//    let result = await Order.insertMany([
//         {item:"samosa",price:15},
//         {item : "vada=pav" , price:30},
//         {item:"chocklet",price:50}
// ]);
// console.log(result)
// }

// addOrders();
