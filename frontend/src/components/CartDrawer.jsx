import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Cartcontext/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const calculateSubtotal = () =>
    cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  const getItemDescription = (item) => {
    // ✅ Handle Tamales
    if (item.type === "tamale" || item.category === "tamale") {
      const filling =
        item.filling ||
        item.customProperties?.find((p) => p.key?.toLowerCase() === "filling")
          ?.value ||
        item.name ||
        "Tamale";

      const wrapper =
        item.wrapper ||
        item.customProperties?.find((p) => p.key?.toLowerCase() === "wrapper")
          ?.value ||
        "";

      const sauce =
        item.sauce ||
        item.customProperties?.find((p) => p.key?.toLowerCase() === "sauce")
          ?.value ||
        "";

      // 🧩 Build description
      let description = `${filling} tamale`;
      if (wrapper) description += ` in ${wrapper}`;
      if (sauce && sauce !== "None") description += ` with ${sauce} sauce`;

      return description;
    }

    // ✅ Handle sides/drinks/etc
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

                  <button onClick={() => removeFromCart(index)}>
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Subtotal: ${calculateSubtotal()}</h3>
            <div className="cart-actions">
              <Link to="/OnlineOrdering" className="cart-btn" onClick={onClose}>
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
