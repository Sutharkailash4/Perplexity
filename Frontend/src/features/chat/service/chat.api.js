import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api"
  : "https://perplexity-5.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export const sendMessageApiCall = async ({ message, chat: chatId }) => {
  try {
    const response = await api.post("/chat/message", { message, chat: chatId });
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

export const getChatApiCall = async () => {
  try {
    const response = await api.get("/chat");
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

export const getMessageApiCall = async (chatId) => {
  try {
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteChatApiCall = async (chatId) => {
  try {
    const response = await api.delete(`/chat/delete/${chatId}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
};