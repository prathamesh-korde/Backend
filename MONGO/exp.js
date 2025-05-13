const mongoose = require('mongoose');

main()
  .then(() => {
    console.log("Connection successful");
    return runQueries(); // run queries after connection
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/exp');
}

// Define schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, select: false }, // hidden by default
  age: { type: Number }
});

const User = mongoose.model('User', userSchema);

// Separate function to run DB operations
async function runQueries() {
  // Create a new user
  await User.create({ username: 'john_doe', email: 'john@example.com', age: 30 });

  // Query without selecting email
  const user1 = await User.findOne({ username: 'john_doe' });
  console.log("Without selecting email:", user1);

  // Query with selecting email explicitly
  const user2 = await User.findOne({ username: 'john_doe' }).select('+email');
  console.log("With selecting email:", user2);
}
