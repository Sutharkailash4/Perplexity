import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialized } from "../auth.slice";
import { getMeApiCall } from "../service/auth.api";

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);

  useEffect(() => {
    if (!initialized) {
      const initializeAuth = async () => {
        try {
          // Try to fetch current user on app load
          await getMeApiCall();
        } catch (error) {
          // If user is not authenticated, that's fine
          console.log("User not authenticated on app load");
        } finally {
          dispatch(setInitialized(true));
        }
      };

      initializeAuth();
    }
  }, [initialized, dispatch]);

  return initialized;
};
