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
app.use(cors({ origin: "http://localhost:5173" || "", credentials: true, methods : ["GET", "POST", "PUT", "DELETE"] }));
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