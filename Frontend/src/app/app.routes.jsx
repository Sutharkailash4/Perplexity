import { createBrowserRouter } from "react-router-dom";
import Login from "../features/authentication/pages/login";
import Register from "../features/authentication/pages/register";

export const router = createBrowserRouter([
  {
    path : "/",
    element : <h1>Welcome to Perplexity</h1>
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