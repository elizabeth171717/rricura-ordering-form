import { useState } from "react";
import { useNavigate } from "react-router-dom";
import salsaverde from "../assets/salsaverde.jpg";
import sourcream from "../assets/sourcream.jpg";
import Navigation from "./Navigation";
import Footer from "./Footer";

const sides = [
  {
    type: "side",

    options: [
      {
        name: " Small Green Sauce",
        size: "Small",
        price: 5,
        img: salsaverde,
        description: "Perfect for 12-20 tamales.",
      },
      {
        name: "Medium Green Sauce",
        size: "Medium",
        price: 8,
        img: salsaverde,
        description: "Perfect for 21-40 tamales.",
      },
      {
        name: "Large Green Sauce",
        size: "Large",
        price: 15,
        img: salsaverde,
        description: "Perfect for 41 tamales and more.",
      },
    ],
  },
  {
    type: "side",

    options: [
      {
        name: "Small Sour Cream",
        size: "Small",
        price: 5,
        img: sourcream,
        description: "Perfect for 12-20 tamales.",
      },
      {
        name: "Medium Sour Cream",
        size: "Medium",
        price: 8,
        img: sourcream,
        description: "Perfect for 21-40 tamales .",
      },
      {
        name: "Large Sour Cream",
        size: "Large",
        price: 15,
        img: sourcream,
        description: "Perfect for 41 tamales and more.",
      },
    ],
  },
];

const SidesSection = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (side, option) => {
    const newItem = {
      type: "side",
      name: option.name,
      size: option.size,
      price: option.price,
      img: option.img,
      description: option.description,
      quantity: 1, // fixed at 1 because size is the selection
    };

    const existing = JSON.parse(localStorage.getItem("tamaleCart")) || [];
    localStorage.setItem("tamaleCart", JSON.stringify([...existing, newItem]));

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="side-container">
      <Navigation />
      <div className="step-container">
        <span onClick={() => navigate(-1)} className="back-button">
          ⬅ Back to Tamales
        </span>
        <h2>🥣 SALSA VERDE & SOUR CREAM</h2>

        {sides.map((side) => (
          <div key={side.name}>
            <h2>{side.name}</h2>
            <div className="grid">
              {side.options.map((option) => (
                <div key={option.size} className="option-card">
                  <img
                    src={option.img}
                    alt={`${side.name} - ${option.size}`}
                    className="tamale-builder-img"
                  />
                  <button
                    onClick={() => addToCart(side, option)}
                    className="sides-btn"
                  >
                    ADD TO CART
                  </button>
                  <p>
                    {option.size} - ${option.price}
                  </p>
                  <p>{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
        <Footer />
      </div>
    </div>
  );
};

export default SidesSection;
