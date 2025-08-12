import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("tamaleCart")) || [];
    setCartItems(savedCart);
  }, [isOpen]);

  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("tamaleCart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () =>
    cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  const getItemDescription = (item) => {
    if (item.type === "tamale") {
      let description = `${item.filling} tamale`;
      if (item.wrapper) description += ` - ${item.wrapper}`;
      if (item.sauce && item.sauce !== "None")
        description += ` - ${item.sauce} sauce`;
      if (item.vegOil) description += " - Veggie Oil";
      if (item.fruit) description += " - with Fruit";
      return description;
    }
    // For drinks, sides, etc.
    let description = item.name || "";
    if (item.size) description = `${item.size} ${description}`;
    return description;
  };

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <span className="close-x" onClick={onClose}>
          ❌
        </span>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart-text">
          Your cart is empty. <Link to="/">Start building tamales</Link>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.img}
                  alt={item.type === "tamale" ? item.filling : item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <p>
                    <strong>Qty:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>{getItemDescription(item)}</strong>
                  </p>
                  <p>
                    <strong>Item Total:</strong> $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => handleRemove(index)}>❌ Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Subtotal: ${calculateSubtotal()}</h3>
            <div className="cart-actions">
              <Link to="/" className="cart-btn" onClick={onClose}>
                ⬅ Keep Shopping
              </Link>
              <Link
                to="/checkout"
                className="cart-btn primary"
                onClick={onClose}
              >
                Continue to Checkout ➡
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
