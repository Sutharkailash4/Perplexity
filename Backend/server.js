import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import ConnectedToDatabase from "./src/config/database.js";
import { generateResponse } from "./src/services/ai.service.js";
import { generateTitle } from "./src/services/ai.service.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const Port = 3000;

// Ensure JWT secrets exist (provide safe dev fallbacks and clear warnings)
if (!process.env.JWT_SECRET) {
    console.warn("Warning: JWT_SECRET is not set. Using a development fallback secret. Set JWT_SECRET in your .env for production.");
    process.env.JWT_SECRET = "dev-jwt-secret";
}

if (!process.env.JWT_EMAIL_VERIFICATION_TOKEN) {
    console.warn("Warning: JWT_EMAIL_VERIFICATION_TOKEN is not set. Using a development fallback secret. Set JWT_EMAIL_VERIFICATION_TOKEN in your .env for production.");
    process.env.JWT_EMAIL_VERIFICATION_TOKEN = "dev-email-secret";
}
const httpServer = http.createServer(app);

initSocket(httpServer);

ConnectedToDatabase();

httpServer.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
}) 

