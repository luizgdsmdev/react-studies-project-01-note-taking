import mongoose from "mongoose";

/**
 * @description Connect to MongoDB database using the URI from environment variables
 * @returns {Promise} - A promise that resolves when the connection is established
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error at connectDB config:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
