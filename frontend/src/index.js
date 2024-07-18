import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // это правильное место для импорта?

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
