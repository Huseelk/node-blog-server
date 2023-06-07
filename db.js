import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

export default connectToDB;
