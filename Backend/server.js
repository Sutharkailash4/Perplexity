import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import ConnectedToDatabase from "./src/config/database.js";
import { generateResponse } from "./src/services/ai.service.js";
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const Port = 3000;

const httpServer = http.createServer(app);

initSocket(httpServer);

ConnectedToDatabase();

generateResponse("What is The capital of india");

httpServer.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
}) 

