const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

main().then(() => {
    console.log("Connection successful");
}).catch(err => {
    console.log(err);
});

// Order Schema & Model
const orderSchema = new Schema({
    item: String,
    price: Number,
});

const Order = mongoose.model("Order", orderSchema);

// Customer Schema
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
});

// Middleware: Pre-hook for delete
customerSchema.pre("findByIdAndDelete", async function () {
    console.log("Pre middleware: Customer will be deleted");
});

// Middleware: Post-hook for deleting related orders
customerSchema.post("findByIdAndDelete", async (customer) => {
    if (customer && customer.orders.length) {
        const result = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log("Post middleware: Related orders deleted:", result);
    }
});

const Customer = mongoose.model("Customer", customerSchema);

// Add orders (optional)
const addOrders = async () => {
    let result = await Order.insertMany([
        { item: "samosa", price: 15 },
        { item: "vada-pav", price: 30 },
        { item: "chocklet", price: 50 }
    ]);
    console.log("Orders inserted:", result);
};

// Add new customer with existing orders
const addCustomer = async () => {
    let cust1 = new Customer({ name: "rohit kumar" });

    let order1 = await Order.findOne({ item: "samosa" });
    let order2 = await Order.findOne({ item: "chocklet" });

    if (order1) cust1.orders.push(order1);
    if (order2) cust1.orders.push(order2);

    let result = await cust1.save();
    console.log("New customer added:", result);
};

// Add a new order to existing customer
const addOrderToExistingCustomer = async () => {
    let newOrder = new Order({ item: "ice", price: 100 });
    await newOrder.save();

    let customer = await Customer.findOne({ name: "nick" });

    if (!customer) {
        console.log("Customer not found");
        return;
    }

    customer.orders.push(newOrder);
    await customer.save();

    console.log("New order added to existing customer");
};

// Delete a customer (will also delete their orders via middleware)
const deleteCustomer = async () => {
    const result = await Customer.findByIdAndDelete("6878998898907d035e319591");
    console.log("Customer deleted:", result);
};

// View customer with populated orders
const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log("Customer with orders:", result[0]);
};

// addOrders();
// addCustomer();
// addOrderToExistingCustomer();
// deleteCustomer();
// findCustomer();
