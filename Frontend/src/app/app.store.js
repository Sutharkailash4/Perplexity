import {configureStore} from "@reduxjs/toolkit";
import authReducer from ".././features/authentication/auth.slice.js"
import chatReducer from "../features/chat/chat.slice.js"

export const store = configureStore({
    reducer : {
        auth : authReducer,
        chat : chatReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                warnAfter: 128,
                ignoredActions: ['chat/setChats', 'chat/setLoading'],
                ignoredPaths: ['chat.chats']
            },
            immutableStateInvariant: {
                warnAfter: 128
            }
        })
})