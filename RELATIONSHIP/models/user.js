const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() => {
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


const addressSchema = new Schema({
    location: String,
    city: String
}, { _id: false });


const userSchema = new Schema({
    userName: String,
    addresses: [addressSchema]
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    let user1 = new User({
        userName: "dr.strange",
        addresses: [
            {
                location: "221b Gurukul Japan",
                city: "Tokyo"
            }
        ]
    });

    user1.addresses.push({ location: "P32 Walkstreet", city: "London" });

    let result = await user1.save();
    console.log(result);
};

addUser();
