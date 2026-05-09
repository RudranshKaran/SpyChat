import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import { SecurityProvider } from "./context/SecurityContext.jsx";
import "./styles/global.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SecurityProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </SecurityProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
