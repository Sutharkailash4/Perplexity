import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/index.css";
import { ToastContainer } from "react-toastify";
import { store } from "./app/app.store";
import { Provider } from "react-redux";

const Root = ReactDOM.createRoot(document.querySelector("#root"));
Root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </StrictMode>,
);
