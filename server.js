import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//  Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

//  Connect to MongoDB
connectDB();

// Create express app
const app = express();

//  Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//  API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//  Serve static files from the React frontend app (production build)
app.use(express.static(path.join(__dirname, "./client/build")));

//  Catch-all to serve React frontend on non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//  Root API response (optional)
app.get("/", (req, res) => {
  res.send("<h1>Welcome To E-Shop</h1>");
});

//  Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
