import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";

const Navigation = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("tamaleCart")) || [];
    setCartItems(savedCart);
  }, [isCartOpen]);

  return (
    <>
      <div className="navigation">
        <img className="logo" src="/logo.png" alt="Logo" />

        <div className="icons-container">
          <Link to="/OnlineOrdering" className="nav-link big-screen">
            ORDER ONLINE
          </Link>
          <a href="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} style={{ fontSize: "1.5rem" }} />
          </a>

          <div
            className="nav-cart-link"
            onClick={() => setIsCartOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <div className="cart-icon-container">
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ fontSize: "1.5rem" }}
              />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
