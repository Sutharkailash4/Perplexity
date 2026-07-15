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
            aiMessage
        });

    } catch(error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
     }
}


export const getChats = async () => {
    try {
        const user = req.user;

        const chats = await ChatModel.find({user : user.id});

        res.status(200).json({
            message : "Chats Fetched Successfully",
            chats
        })

    } catch (error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
    }
}

export const getMessages = async () => {
    try {
        const {chatId} = req.params;

        const chat = await ChatModel.findOne({
            _id : chatId,
            user : req.user.id
        })

        if(!chat) {
            return res.status(404).json({
                message : "Chat not found"
            })
        }

        const messages = await messageModel.find({
            chat : chatId
        })

        res.status(200).json({
            message : "Messages Fethced Successully",
            messages
        })

    } catch (error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
    }
}