import { initializeSocketConnection } from "../service/chat.socket";

export const useChat = () => {
    try {
        return (initializeSocketConnection);
    } catch(error) {
        console.log(error.message);
    }
}