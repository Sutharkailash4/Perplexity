import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoute from "./routes/authentication.route.js";
import chatRoute from "./routes/chat.route.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://perplexity-06.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (Postman, Thunder Client, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS Error: ${origin} is not allowed.`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is Running 🚀",
  });
});

export default app;