import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";

import env from "./config/env.js";

import {
  notFoundMiddleware,
  errorMiddleware,
} from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();

// Trust proxy
app.set("trust proxy", 1);

// Security middleware
app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

// Request parsing middleware
app.use(cookieParser());

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// HTTP request logger
if (env.nodeEnv !== "test") {
  app.use(
    morgan(
      ":method :url :status :response-time ms"
    )
  );
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// Health check
app.get(
  "/api/v1/health",
  async (req, res) =>
    res.json({
      success: true,
      message: "API is running",
      timestamp: new Date().toISOString(),
      environment: env.nodeEnv,
      database: global.mongooseConnected
        ? "connected"
        : "unknown",
    })
);

// Static uploads
app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use(
  "/api/v1/notifications",
  notificationRoutes
);
app.use(
  "/api/v1/dashboard",
  dashboardRoutes
);
app.use(
  "/api/v1/analytics",
  analyticsRoutes
);



// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;