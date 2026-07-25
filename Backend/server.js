import "dotenv/config"; //  
import app from "./src/app.js";
import ConnectedToDatabase from "./src/config/database.js";
import { generateResponse, generateTitle } from "./src/services/ai.service.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const Port = 3000;

if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is not set. Using dev fallback.");
  process.env.JWT_SECRET = "dev-jwt-secret";
}

if (!process.env.JWT_EMAIL_VERIFICATION_TOKEN) {
  console.warn("Warning: JWT_EMAIL_VERIFICATION_TOKEN is not set. Using dev fallback.");
  process.env.JWT_EMAIL_VERIFICATION_TOKEN = "dev-email-secret";
}

const httpServer = http.createServer(app);

initSocket(httpServer);
ConnectedToDatabase();

httpServer.listen(Port, () => {
  console.log(`Server is Running on Port ${Port}`);
});