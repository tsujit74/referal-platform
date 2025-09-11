// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ErrorProvider } from "./context/ErrorContext";
import { SuccessProvider } from "./context/SuccessContext";
import { AuthProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <SuccessProvider>
          <AuthProvider> 
            <App />
          </AuthProvider>
        </SuccessProvider>
      </ErrorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
