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

        const result = await generateResponse(messages);

        const aiMessage = await messageModel.create({
            chat: chat._id,
            content: result,
            role: "assistant"
        });   

        res.status(201).json({
            title,
            chat,
            userMessage,
            aiMessage
        });

    } catch(error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
     }
}


export const getChatsController = async (req, res) => {
    try {
        const user = req.user;

        const chats = await ChatModel.find({user : user.id}).sort({ updatedAt: -1 });

        res.status(200).json({
            message : "Chats Fetched Successfully",
            success: true,
            chats
        })

    } catch (error) {
        res.status(400).json({
            message : "Something Went Wrong",
            success: false,
            error : error.message
        })
    }
}

export const getMessagesController = async (req, res) => {
    try {
        const {chatId} = req.params;

        const chat = await ChatModel.findOne({
            _id : chatId,
            user : req.user.id
        })

        if(!chat) {
            return res.status(404).json({
                message : "Chat not found",
                success: false
            })
        }

        const messages = await messageModel.find({
            chat : chatId
        }).sort({ createdAt: 1 });

        res.status(200).json({
            message : "Messages Fetched Successfully",
            success: true,
            messages
        })

    } catch (error) {
        res.status(400).json({
            message : "Something Went Wrong",
            success: false,
            error : error.message
        })
    }
}

export const deleteChatController = async (req, res) => {
    try {
        const {chatId} = req.params;

        const chat = await ChatModel.findOneAndDelete({
            _id : chatId,
            user : req.user.id
        });

        if(!chat) {
            return res.status(404).json({
                message : "Chat not found",
                success: false
            })
        }

        await messageModel.deleteMany({
            chat : chatId
        })

        res.status(200).json({
            message : "Chat Deleted Successfully",
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message : "Something Went Wrong",
            success: false,
            error : error.message
        })
    }
}
