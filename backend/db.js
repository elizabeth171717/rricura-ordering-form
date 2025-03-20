const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace 'your-mongodb-url' with your actual MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error);
    process.exit(1); // Exit the app if the connection fails
  }
};

module.exports = connectDB;
