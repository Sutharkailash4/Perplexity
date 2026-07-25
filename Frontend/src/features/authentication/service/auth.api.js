import axios from "axios";

const api = axios.create({
    baseURL:  "https://perplexity-6.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const registerApiCall = async ({username, email, password}) => {
    try {
        const response = await api.post("/auth/register", { username, email, password });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
};

export const loginApiCall = async ({email, password}) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
};

export const getMeApiCall = async () => {
    try {
        const response = await api.get("/auth/getMe");
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
};

export const logoutApiCall = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || error.message);
        throw error;
    }
};