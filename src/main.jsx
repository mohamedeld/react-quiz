import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QuestionProvider } from "./contexts/QuestionContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </React.StrictMode>
);
