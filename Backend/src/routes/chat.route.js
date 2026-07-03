import {Router} from "express";
import { sendMessageController } from "../controllers/chat.controllers.js";

const chatRoute = Router();

chatRoute.post("/message", sendMessageController);

export default chatRoute;