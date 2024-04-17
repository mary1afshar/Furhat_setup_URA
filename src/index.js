import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserSelectionProvider } from "./userInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserSelectionProvider>
    <App />
  </UserSelectionProvider>
);
