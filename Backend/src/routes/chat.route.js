import {Router} from "express";
import { sendMessageController } from "../controllers/chat.controllers";

const chatRoute = Router();

chatRoute.post("/message", sendMessageController);

export default chatRoute;