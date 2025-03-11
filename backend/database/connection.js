import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Ensure environment variables are loaded
dotenv.config();

export const connection = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing in environment variables!");
    }

    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_AUCTION_PLATFORM",
    });

    console.log("✅ Connected to database.");
  } catch (err) {
    console.error(`❌ Error while connecting to database: ${err.message}`);
    process.exit(1); // Exit if MongoDB connection fails
  }
};
