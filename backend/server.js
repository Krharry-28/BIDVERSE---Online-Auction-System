import app from "./app.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose"; // Import mongoose
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables

// ✅ Debugging: Check if environment variables are loaded
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

// ✅ Connect to MongoDB
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// ✅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);
