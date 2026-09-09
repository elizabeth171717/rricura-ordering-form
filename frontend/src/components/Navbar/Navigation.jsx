import React, { useState, useContext } from "react";
import { CartContext } from "../../Cartcontext/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navigation.css";
import CartDrawer from "../CartDrawer/CartDrawer";
import MEXICANFLAG from "../../assets/mexicanflag.png";
const Navigation = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useContext(CartContext); // comes straight from context

  return (
    <>
    <div className="marquee">
      <div className="marquee-content">
     Important Event coming up? Your guests want "AUTHENTIC MEXICAN FOOD" Feed from 10 up to 1000 guests or more!!!
    
      </div>
    </div>
      <div className="navigation">
        <Link to="/">
          <img className="logo" src="/logo.png" alt="Logo" />
           
        </Link>
          <img  style={{ width: "50px" }}
                src={MEXICANFLAG}
                alt=""

              />
        <div className="icons-container">
          <Link to="/OnlineOrdering" className="nav-link order-link-text">
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
