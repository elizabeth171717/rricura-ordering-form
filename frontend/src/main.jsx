import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// 🟢 ADD THIS BLOCK (Top-level, before React renders)
if (window.location.hostname === "localhost") {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ debug_mode: true });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
