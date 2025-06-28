const mongoose = require('mongoose');
const {Schema} = mongoose;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

main().then(()=>{
    console.log("connection Sucessfull");
}).catch(err=>{
    console.log(err);
})

const orderSchema = new Schema({
    item:String,
    price : Number,
})

const customerSchema = new Schema({
    name:String,
    orders :[{
        type:Schema.Types.ObjectId,
        ref:"Order",
    }]
})

const Order = mongoose.model("Order",orderSchema);
const  Customer = mongoose.model("Customer",customerSchema);

const addCustomer = async () => {
    let cust1 = new Customer({
        name: "rohit kumar",
    });

    let order1 = await Order.findOne({ item: "samosa" });
    let order2 = await Order.findOne({ item: "chocklet" }); 


    //we pass entire object bust inside database(mongoo db) we only seen the object _id
    if (order1) cust1.orders.push(order1);
    if (order2) cust1.orders.push(order2); 

    let result = await cust1.save();
    console.log(result);
};


addCustomer();

//creating model

// const addOrders = async()=>{
//    let result = await Order.insertMany([
//         {item:"samosa",price:15},
//         {item : "vada=pav" , price:30},
//         {item:"chocklet",price:50}
// ]);
// console.log(result)
// }

// addOrders();

