import { useDispatch } from "react-redux";
import { registerApiCall, loginApiCall, getMeApiCall, logoutApiCall } from "../service/auth.api";
import {setUser, setLoading, setError} from "../auth.slice";

export const useAuth = () => {

    const dispatch = useDispatch();

    const handleRegister = async ({username, email, password}) => {
        try {
            dispatch(setLoading(true))
            const data = await registerApiCall({username, email, password})
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration Failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async ({email, password}) => {
        try {
            dispatch(setLoading(true))
            const data = await loginApiCall({email, password});
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login Failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true))  
            const data = await getMeApiCall();
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.response?.data?.message) || "User Not Found")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogout = async () => {
        try {
            dispatch(setLoading(true))
            const data = await logoutApiCall();
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Logout Falied"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout
}
}

