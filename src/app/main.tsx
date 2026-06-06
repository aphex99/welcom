import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/shared/styles/tailwind.css";
import "@/shared/styles/global.scss";

import App from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
