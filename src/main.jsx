import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./SharedContext/CartProvider.jsx";
import { WishListProvider } from "./SharedContext/WishListProvider.jsx";
import "./index.css";
import "./i18n";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <WishListProvider>
        <App />
      </WishListProvider>
    </CartProvider>
  </StrictMode>
);
