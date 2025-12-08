import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "@/context/userProvider"; // <-- import the provider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider> {/* <-- wrap your app */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
