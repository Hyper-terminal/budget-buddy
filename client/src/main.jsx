import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import { ExpenseProvider } from "./context/expense-context";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ExpenseProvider>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ExpenseProvider>
  </AuthProvider>
);
