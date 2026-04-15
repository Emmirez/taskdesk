// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";
import taskRoutes     from "./routes/taskRoutes.js";

// Connect DB
connectDB();

const app = express();

//  Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limit all /api routes
app.use("/api", apiLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running",
    env: process.env.NODE_ENV,
    time: new Date().toISOString(),
  });
});

// 404
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found` });
});

//  Global error handler
app.use(errorHandler);

//  Start
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `🚀  Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
});

process.on("unhandledRejection", (err) => {
  console.error(`❌  Unhandled rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
