import React, { useState, useContext } from "react";
import { CartContext } from "../Cartcontext/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CartDrawer from "./CartDrawer";

const Navigation = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useContext(CartContext); // comes straight from context

  return (
    <>
      <div className="navigation">
        <Link to="/">
          <img className="logo" src="/logo.png" alt="Logo" />
        </Link>
        <div className="icons-container">
          <Link to="/OnlineOrdering" className="nav-link big-screen">
            ORDER ONLINE
          </Link>

          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} style={{ fontSize: "1.5rem" }} />
          </Link>

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
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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
