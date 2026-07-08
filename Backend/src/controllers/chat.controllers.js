import { generateResponse, generateTitle } from "../services/ai.service.js";

export const sendMessageController = async (req, res) => {
    try {
        const {message} = req.body;

        const title = await generateTitle(message);
        const result = await generateResponse(message);

        res.status(201).json({
            title : title,
            response : result
        })
    } catch(error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
    }
}  