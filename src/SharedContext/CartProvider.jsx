import React, { useState, useMemo, useEffect } from "react";
import { CartContext } from "./CartContext";
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(qty, 0) } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  const count = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.qty, 0),
    [cartItems]
  );
  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    count,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
