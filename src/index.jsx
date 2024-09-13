import React from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App";
import "./styles/index.css";
import "./styles/main.scss";
import "./styles/QuestionUI.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
