import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    />
    <App />
  </>
);
