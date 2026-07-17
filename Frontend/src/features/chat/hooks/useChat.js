import { initializeSocketConnection } from "../service/chat.socket";
import {sendMessageApiCall, getChatApiCall, getMessageApiCall, deleteChatApiCall}  from "../service/chat.api";
import { useDispatch, useSelector } from "react-redux";
import {setChats, setCurrentChatId,  setLoading, setError} from "../chat.slice.js";

export const useChat = () => {

    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chat.chats);
    const currentChatId = useSelector((state) => state.chat.currentChatId);
    const loading = useSelector((state) => state.chat.isLoading);
    const error = useSelector((state) => state.chat.error);

    const handleSendMessage = async ({message, chatId}) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            
            const response = await sendMessageApiCall({message, chat: chatId});
            
            if (!chatId && response.chat) {
                dispatch(setCurrentChatId(response.chat._id));
            }
            
            const updatedChats = await getChatApiCall();
            dispatch(setChats(updatedChats.chats));
            
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            dispatch(setLoading(false));
            throw error;
        }
    }

    const handleGetChat = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            
            const response = await getChatApiCall();
            dispatch(setChats(response.chats));
            
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            dispatch(setLoading(false));
            throw error;
        } 
    }

    const handleGetMessage = async (chatId) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            
            const response = await getMessageApiCall(chatId);
            
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            dispatch(setLoading(false));
            throw error;
        }
    }

    const handleDeleteChat = async (chatId) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            
            const response = await deleteChatApiCall(chatId);
            
            const updatedChats = await getChatApiCall();
            dispatch(setChats(updatedChats.chats));
            
            if (currentChatId === chatId) {
                dispatch(setCurrentChatId(null));
            }
            
            dispatch(setLoading(false));
            return response;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            dispatch(setLoading(false));
            throw error;
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChat,
        handleGetMessage,
        handleDeleteChat,
        chats,
        currentChatId,
        loading,
        error
    };
};
