import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import DateProvider from "./context/DateContext.tsx";

import "./index.css";
import StatusProvider from "./context/StatusContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StatusProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </StatusProvider>
  </React.StrictMode>
);
