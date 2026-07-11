import {Router} from "express";
import { sendMessageController } from "../controllers/chat.controllers.js";
import { identifyUser } from "../middleware/auth.middleware.js";

const chatRoute = Router();

chatRoute.post("/message", identifyUser, sendMessageController);

export default chatRoute;