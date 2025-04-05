import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // 👈 this is critical
  })
);

// --- Security Middlewares ---
app.use(helmet());
app.use(cookieParser());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(csurf({ cookie: true }));
app.use(morgan("dev"));

app.use((req: Request, res: Response, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    secure: false,
  });
  next();
});

// CSRF Token Route for testing
app.get("/api/csrf-token", (req: Request, res: Response) => {
  const token = req.csrfToken();

  res.cookie("XSRF-TOKEN", token, {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  res.status(200).json({ csrfToken: token });
});

// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "CargoPilot API is running", status: 200 });
});

import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import managerRoutes from "./routes/managerRoutes";
import driverRoutes from "./routes/driverRoutes";

// Mount your routes (example for auth routes)
app.use("/api/auth", authRoutes);

// Orders route to create and retrieve orders
app.use("/api/orders", orderRoutes);

// Mount manager routes (for manager-specific functionality)
app.use("/api/manager", managerRoutes);

// Mount driver routes under /api/driver
app.use("/api/driver", driverRoutes);

// Global error handling middleware
import errorMiddleware from "./middlewares/errorMiddleware";
app.use(errorMiddleware);

// Connect to MongoDB (no deprecated options)
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error: Error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
