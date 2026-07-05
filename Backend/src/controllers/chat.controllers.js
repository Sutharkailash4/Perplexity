import { generateResponse } from "../services/ai.service.js";


export const sendMessageController = async (req, res) => {
    try {
        const {message} = req.body;

        const result = await generateResponse(message);

        res.status(201).json({
            Ai_Response : result
        })
    } catch(error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
    }
}
   