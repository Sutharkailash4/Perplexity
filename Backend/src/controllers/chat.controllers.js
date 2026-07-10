import { generateResponse, generateTitle } from "../services/ai.service.js";
import messageModel from "../models/message.model.js";
import ChatModel from "../models/chat.model.js";

export const sendMessageController = async (req, res) => {
    try {
        const {message} = req.body;

        const title = await generateTitle(message);
        const result = await generateResponse(message);

        console.log(req.user.id);

        const chat = await ChatModel.create({
            user : req.user.id,
            title
        });

        const userMessage = await MessageModel.create({
            chat : chat._id,
            content : message,
            role : "user"
        })

        const aiMessage = await MessageModel.create({
            chat : chat._id,
            content : result,
            role : "ai"
        })

        res.status(201).json({
            title,
            chat,
            aiMessage
        })
    } catch(error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
     }
}