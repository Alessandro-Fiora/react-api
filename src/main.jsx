import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// BOOTSTRAP CSS
import "bootstrap/dist/css/bootstrap.min.css";
// CUSTOM CSS
import "./assets/css/index.css";

// BOOTSTRAP JS
import * as bootstrap from "bootstrap";

import App from "./assets/components/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
