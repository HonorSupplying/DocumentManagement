import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
// React 18 requires createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
