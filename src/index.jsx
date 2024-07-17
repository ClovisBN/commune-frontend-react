import React from "react";
import ReactDOM from "react-dom/client"; // Importer createRoot
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // Utiliser createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
