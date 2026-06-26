import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000",
    withCredentials : true
});

export const registerApiCall = async ({username, email, password}) => {
    try {
        const response = await api.post("/api/auth/register", 
            {username, email, password}
        )

        return response.data;

    } catch (error) {   
        console.log(error.message);
    }
}

export const loginApiCall = async ({email, password}) => {
    try {
        const response = await api.post("/api/auth/login",
            {email, password}
        )

        return response.data;

    } catch (error) {
        console.log(error.message);
    }
}

export const getMeApiCall = async () => {
    try {
        const response = await api.get("/api/auth/getMe")
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const logoutApiCall = async () => {
    try {
        const response = await api.post("/api/auth/logout")
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

