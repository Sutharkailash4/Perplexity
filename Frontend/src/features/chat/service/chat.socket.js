import {io} from "socket.io-client";

let socket = null;

export const initializeSocketConnection = () => {

    try{
        if (socket && socket.connected) {
            console.log("Socket already connected");
            return socket;
        }

        socket = io("/", {
            withCredentials: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server with ID:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
        });

        socket.on("error", (error) => {
            console.error("Socket.IO error:", error);
        });

        return socket;
    }
    catch(error) {
        console.error("Failed to initialize socket connection:", error.message);
        return null;
    }

}

export const getSocket = () => {
    return socket;
}

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}
