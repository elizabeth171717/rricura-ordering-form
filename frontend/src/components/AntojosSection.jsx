import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import esquite from "../assets/esquite.jpg";
import PeopleCount from "./PeopleCount";
import Navigation from "./Navigation";
import Footer from "./Footer";

// Cart Context
import { CartContext } from "../Cartcontext/CartContext";

const antojosOptions = [{ name: "Esquite", img: esquite, basePrice: 4 }];

const AntojosSection = () => {
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [totalAntojos, setTotalAntojos] = useState(null);
  const [selectedAntojo, setSelectedAntojo] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const isReady = selectedAntojo && totalAntojos && totalAntojos >= 1;

  const subtotal = isReady
    ? (selectedAntojo.basePrice * totalAntojos).toFixed(2)
    : null;

  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "antojos",
      ...selectedAntojo,
      quantity: totalAntojos,
      price: selectedAntojo.basePrice,
      img: selectedAntojo.img,
    };

    addToCartContext(newItem);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <div className="app-container">
      <Navigation />
      <div className="step-container">
        <span onClick={() => navigate(-1)} className="back-button">
          ⬅ Back to Tamales
        </span>
        <h2> 🌽 Antojitos</h2>

        {/* Quantity Picker */}
        <PeopleCount setPeople={setTotalAntojos} value={totalAntojos} />
        <div className="grid-container">
          {/* Drink Selection */}

          <div className="grid">
            {antojosOptions.map((antojo) => (
              <div
                key={antojo.name}
                className={`option-card ${
                  selectedAntojo?.name === antojo.name ? "selected" : ""
                }`}
                onClick={() => setSelectedAntojo(antojo)}
              >
                <img
                  src={antojo.img}
                  alt={antojo.name}
                  className="product-img"
                />
                <p>{antojo.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Summary + Add to Cart */}
        {isReady && (
          <>
            <img
              src={selectedAntojo.img}
              alt={selectedAntojo.name}
              className="selected-tamale-img"
            />
            <p>
              {totalAntojos} {selectedAntojo.name} — ${subtotal}
            </p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AntojosSection;
