import dotenv from "dotenv";

dotenv.config();

// Environment configuration
const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT || 5001),

  mongoUri:
    process.env.MONGO_URI, //|| "mongodb://127.0.0.1:27017/admin_dashboard",

  jwtSecret:
    process.env.JWT_SECRET || "development_only_change_me",

  jwtExpiresIn:
    process.env.JWT_EXPIRES_IN || "7d",

  clientUrl:
    process.env.CLIENT_URL || "http://localhost:5173",

  lowStockThreshold:
    Number(process.env.LOW_STOCK_THRESHOLD || 5),

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};

export default env;