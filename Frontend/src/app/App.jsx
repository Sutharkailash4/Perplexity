import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { useAuth } from "../features/authentication/hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      try {
        await auth.handleGetMe();
      } catch (error) {
        // Intentionally ignore auth errors during initialization
      }
    };

    loadUser();
  }, [auth]);

  return <RouterProvider router={router} />;
};

export default App;
