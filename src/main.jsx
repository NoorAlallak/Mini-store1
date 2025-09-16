import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./SharedContext/CartProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
