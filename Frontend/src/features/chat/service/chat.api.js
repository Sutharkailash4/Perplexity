import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials: true,
});

export const sendMessageApiCall = async ({message, chatId}) => {
    try {
        
        const response = await api.post("/chat/message", { message, chatId });
        return response.data;

    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
}

export const getChatApiCall = async () => {
    try {

        const response = await api.get("/chat")
        return response.data;

    }   catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    } 
}

export const getMessageApiCall = async (chatId) => {
    try {
         
        const resposne = await api.get(`/chat/${chatId}/messages`)
        return resposne.data;
        
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
}

export const deleteChatApiCall = async (chatId) => {
    try {

        const response = await api.delete(`/chat/delete/${chatId}`)
        return response.data;

    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
}