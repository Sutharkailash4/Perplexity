import { createBrowserRouter } from "react-router-dom";
import Login from "../features/authentication/pages/login";
import Register from "../features/authentication/pages/register";
import Dashboard from "../features/chat/pages/dashboard";
import Protected from "../features/authentication/components/protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
