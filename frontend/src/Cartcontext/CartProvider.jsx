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
 let success = true;

  setCartItems((prev) => {
    if (prev.length > 0) {
      const currentType = prev[0].orderType;

        if (currentType !== newItem.orderType) {
       
        success = false;
        return prev; // 🚫 block
      }
    }

    return [...prev, newItem]; // ✅ allow
 
  });
 if (!success) return false;
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
   return true; // ✅ THIS is the real return
};

  const removeFromCart = (indexToRemove) => {
  setCartItems((prev) => {
    const removedItem = prev[indexToRemove];

    if (!removedItem) return prev;

    pushToDataLayer("remove_from_cart", {
      event: "remove_from_cart",
      ecommerce: {
        currency: "USD",
        value: removedItem.price * removedItem.quantity,
        items: [
          {
            item_id: removedItem.id,
            item_name: removedItem.name || removedItem.filling,
            item_category: removedItem.type,
            price: removedItem.price,
            quantity: removedItem.quantity,
            wrapper: removedItem.wrapper || undefined,
            sauce: removedItem.sauce || undefined,
            size: removedItem.size || undefined,
          },
        ],
      },
    });

    return prev.filter((_, index) => index !== indexToRemove);
  });
};


const updateQuantity = (id, options, quantity) => {
  setCartItems((prev) => {
    const existingItem = prev.find(
      (item) => item.id === id && item.options === options
    );

    if (!existingItem) return prev;

    const oldQuantity = existingItem.quantity;

    // Don't allow invalid quantities
    if (quantity < 0) return prev;

    // Quantity did not actually change
    if (quantity === oldQuantity) return prev;

    const quantityDifference = quantity - oldQuantity;

    // Customer DECREASED quantity
    if (quantityDifference < 0) {
      const removedQuantity = Math.abs(quantityDifference);

      pushToDataLayer("remove_from_cart", {
        event: "remove_from_cart",
        ecommerce: {
          currency: "USD",
          value: existingItem.price * removedQuantity,
          items: [
            {
              item_id: existingItem.id,
              item_name: existingItem.name || existingItem.filling,
              item_category: existingItem.type,
              price: existingItem.price,
              quantity: removedQuantity,
              wrapper: existingItem.wrapper || undefined,
              sauce: existingItem.sauce || undefined,
              size: existingItem.size || undefined,
            },
          ],
        },
      });
    }

    // Customer INCREASED quantity
    if (quantityDifference > 0) {
      const addedQuantity = quantityDifference;

      pushToDataLayer("add_to_cart", {
        event: "add_to_cart",
        ecommerce: {
          currency: "USD",
          value: existingItem.price * addedQuantity,
          items: [
            {
              item_id: existingItem.id,
              item_name: existingItem.name || existingItem.filling,
              item_category: existingItem.type,
              price: existingItem.price,
              quantity: addedQuantity,
              wrapper: existingItem.wrapper || undefined,
              sauce: existingItem.sauce || undefined,
              size: existingItem.size || undefined,
            },
          ],
        },
      });
    }

    return prev.map((item) =>
      item.id === id && item.options === options
        ? { ...item, quantity }
        : item
    );
  });
};

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // discount + final total
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