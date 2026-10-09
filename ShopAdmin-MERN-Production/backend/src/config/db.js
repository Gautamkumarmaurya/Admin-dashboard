import mongoose from "mongoose";
import env from "./env.js";

// Connect to MongoDB
export async function connectDB() {
  try {
    const connection = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);

    return connection;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
}

// Disconnect from MongoDB
export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}