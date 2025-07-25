const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch {
    console.error("MongoDB connection failed.");
    process.exit(1);
  }
}

module.exports = connectDB;
