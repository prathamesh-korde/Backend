const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
    console.log("Connection successful");
}
main().catch(err => console.log(err));

const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String,
    Likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
//     let user = await User.findOne({ username: "rohit kumar" });

//     if (!user) {
//         console.log("User not found");
//         return;
//     }

//     const post2 = new Post({
//         content: "bye bye",
//         Likes: 29,
//         user: user._id 
//     });

//     await post2.save();
//     console.log("Post saved successfully");
// };


// addData();

const getData = async () => {
    const result = await Post.findOne({}).populate("user","email");
    console.log(result);
};

getData();

