import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { pushToDataLayer } from "../analytics/gtmEvents";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("tamaleCart");
    return stored ? JSON.parse(stored) : [];
  });

  const [coupon, setCoupon] = useState(null); // ✅ coupon state
  const [isFirstPurchase, setIsFirstPurchase] = useState(true); // ✅ flip false after checkout

  useEffect(() => {
    localStorage.setItem("tamaleCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems((prev) => [...prev, newItem]);
    pushToDataLayer("add_to_cart", {
      event: "add_to_cart",
      ecommerce: {
        currency: "USD",
        value: newItem.price * newItem.quantity,
        items: [
          {
            item_id: newItem.id,
            item_name: newItem.name || newItem.filling,
            item_category: newItem.type,
            price: newItem.price,
            quantity: newItem.quantity,
            wrapper: newItem.wrapper || undefined,
            sauce: newItem.sauce || undefined,
            size: newItem.size || undefined,
          },
        ],
      },
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const updateQuantity = (id, options, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.options === options
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ discount + final total
  const discount =
    coupon === "FIRST10" && isFirstPurchase ? cartTotal * 0.1 : 0;
  const finalCartTotal = cartTotal - discount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        coupon,
        setCoupon,
        isFirstPurchase,
        setIsFirstPurchase,
        discount, // discount on items
        finalCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
