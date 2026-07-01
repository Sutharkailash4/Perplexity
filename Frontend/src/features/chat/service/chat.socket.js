import {io} from "socket.io-client";

export const initializeSocketConnection = () => {

    try{
        const socket = io("http://localhost:3000", {
            withCredentials : true
        })

        socket.on("connect", () => {
            console.log("Connected to Socket.Io server");
        })
    }
    catch(error) {
        console.log(error.message);
    }

}