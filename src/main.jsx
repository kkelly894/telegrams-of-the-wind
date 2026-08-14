import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { TelegramProvider } from "./context/TelegramContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TelegramProvider>
          <App />
        </TelegramProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
