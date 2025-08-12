import { useState } from "react";
import { useNavigate } from "react-router-dom";

import esquite from "../assets/esquite.jpg";
import PeopleCount from "./PeopleCount";
import Navigation from "./Navigation";
import Footer from "./Footer";

const antojosOptions = [{ name: "Esquite", img: esquite, basePrice: 4 }];

const AntojosSection = () => {
  const navigate = useNavigate();
  const [totalAntojos, setTotalAntojos] = useState(null);
  const [selectedAntojo, setSelectedAntojo] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const isReady = selectedAntojo && totalAntojos && totalAntojos >= 1;

  const subtotal = isReady
    ? (selectedAntojo.basePrice * totalAntojos).toFixed(2)
    : null;

  const addToCart = () => {
    if (!isReady) return;
    const newItem = {
      type: "antojos",
      ...selectedAntojo,
      quantity: totalAntojos,
      price: selectedAntojo.basePrice,
      img: selectedAntojo.img,
    };

    const existing = JSON.parse(localStorage.getItem("tamaleCart")) || [];
    localStorage.setItem("tamaleCart", JSON.stringify([...existing, newItem]));

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
            <button onClick={addToCart}>Add to Cart</button>
            {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AntojosSection;
