import { useDispatch } from "react-redux";
import { registerApiCall, loginApiCall, getMeApiCall, logoutApiCall } from "../service/auth.api";
import {setUser, setLoading, setInitialized, setError} from "../auth.slice";

export const useAuth = () => {

    const dispatch = useDispatch();

    const handleRegister = async ({username, email, password}) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await registerApiCall({username, email, password});
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration Failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleLogin = async ({email, password}) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await loginApiCall({email, password});
            dispatch(setUser(data.user));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login Failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await getMeApiCall();
            dispatch(setUser(data.user));
            return data;
        } catch (error) {
            dispatch(setUser(null));
            dispatch(setError(error.response?.data?.message || "User Not Found"));
            throw error;
        } finally {
            dispatch(setInitialized(true));
            dispatch(setLoading(false));
        }
    };

    const handleLogout = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            await logoutApiCall();
            dispatch(setUser(null));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Logout Failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    };
};

