import {Router} from "express";
import { sendMessageController, getChatsController, getMessagesController, deleteChatController } from "../controllers/chat.controllers.js";
import { identifyUser } from "../middleware/auth.middleware.js";

const chatRoute = Router();

chatRoute.post("/message", identifyUser, sendMessageController);
chatRoute.get("/", identifyUser, getChatsController);
chatRoute.get("/:chatId/messages", identifyUser, getMessagesController);
chatRoute.delete("/delete/:chatId", identifyUser, deleteChatController);

export default chatRoute;