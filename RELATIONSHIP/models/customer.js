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

// customerSchema.pre("findOneAndDelete",async()=>{
//     console.log("pre middleware");
// })

customerSchema.post("findOneAndDelete", async function(customer) {
    if (customer && customer.orders.length) {
        const result = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(result);
    }
});


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


//addCustomer();

// creating model

// const addOrders = async()=>{
//    let result = await Order.insertMany([
//         {item:"samosa",price:15},
//         {item : "vada=pav" , price:30},
//         {item:"chocklet",price:50}
// ]);
// console.log(result)
// }

// addOrders();


const findCustomer = async()=>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}

//function
const addCust = async () =>{

    let newCust = new Customer({
        name:"nick"
    });

    let newOrder = new Order({
        item:"pie",
        price:750
    })

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("new customer is added");

};

//addCust();

const deletCustomer = async ()=>{
let data = await Customer.findByIdAndDelete('6866c4b7fd117a7ff51fcc22');
console.log(data);
}

deletCustomer();