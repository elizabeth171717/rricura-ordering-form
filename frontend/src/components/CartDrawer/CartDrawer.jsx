import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Cartcontext/CartContext";
import { pushToDataLayer } from "../../analytics/gtmEvents";
import "./CartDrawer.css";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);


useEffect(() => {
  if (!isOpen || cartItems.length === 0) return;

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  pushToDataLayer("view_cart", {
    event: "view_cart",
    ecommerce: {
      currency: "USD",
      value: cartTotal,
      items: cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name || item.filling,
        item_category: item.type,
        price: item.price,
        quantity: item.quantity,
        wrapper: item.wrapper || undefined,
        sauce: item.sauce || undefined,
        size: item.size || undefined,
      })),
    },
  });

  console.log("🛒 GA4 view_cart:", cartItems);
}, [isOpen]);

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
  to="/checkoutpage"
  className="cart-btn primary"
  onClick={() => {
    const cartTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    pushToDataLayer("begin_checkout", {
      event: "begin_checkout",
      ecommerce: {
        currency: "USD",
        value: cartTotal,
        items: cartItems.map((item) => ({
          item_id: item.id,
          item_name: item.name || item.filling,
          item_category: item.type,
          price: item.price,
          quantity: item.quantity,
          wrapper: item.wrapper || undefined,
          sauce: item.sauce || undefined,
          size: item.size || undefined,
        })),
      },
    });

    console.log("🛒 GA4 begin_checkout:", cartItems);

    onClose();
  }}
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
