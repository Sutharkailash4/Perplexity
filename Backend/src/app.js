import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authentication.route.js";
import chatRoute from "./routes/chat.route.js";
import morgan from "morgan";

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://perplexity-1-fczu.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);

// Health Check

app.get("/", (req, res) => {
    res.json({
        message : "Server is Running"
    })
});

export default app;