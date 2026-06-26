import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import ConnectedToDatabase from "./src/config/database.js";
import { testAI } from "./src/services/ai.service.js";

const Port = 3000;

ConnectedToDatabase();

testAI();

app.listen(Port, () => {
    console.log(`Server is Running on Port ${Port}`);
}) 