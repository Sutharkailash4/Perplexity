import { generateResponse, generateTitle } from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
import ChatModel from "../models/chat.model.js";

export const sendMessageController = async (req, res) => {
    try {
        const {message, chat : chatId} = req.body;

        
        let title = null;
        let chat = null;

        if (!chatId) {
            title = await generateTitle(message);
            chat = await ChatModel.create({
                user: req.user.id,
                title
            });
        } else {
            chat = await ChatModel.findById(chatId);
            if (!chat) {
                return res.status(404).json({
                    message: "Chat not found",
                    success: false,
                    error: "Invalid chat id"
                });
            }
        }
        
        const userMessage = await messageModel.create({
            chat: chat._id,
            content: message,
            role: "user"
        });
        
        const messages = await messageModel.find({ chat: chat._id });
        
        console.log(messages);
        
        const result = await generateResponse(message);

        const aiMessage = await messageModel.create({
            chat: chat._id,
            content: result,
            role: "assistant"
        });

        res.status(201).json({
            title,
            chat,
            aiMessage
        });
    } catch(error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
     }
}

