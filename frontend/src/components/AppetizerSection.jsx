import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blackBean from "../assets/blackbeansoup.jpg";
import chickenSoup from "../assets/chickensoup.jpg";

import PeopleCount from "./PeopleCount";
import Navigation from "./Navigation";
import Footer from "./Footer";

const appetizerOptions = [
  { name: "Black Bean Soup", img: blackBean, basePrice: 4 },
  { name: "Chicken Soup", img: chickenSoup, basePrice: 4 },
];

const AppetizerSection = () => {
  const navigate = useNavigate();
  const [totalAppetizers, setTotalAppetizers] = useState(null);
  const [selectedAppetizer, setSelectedAppetizer] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const isReady = selectedAppetizer && totalAppetizers && totalAppetizers >= 1;

  const subtotal = isReady
    ? (selectedAppetizer.basePrice * totalAppetizers).toFixed(2)
    : null;

  const addToCart = () => {
    if (!isReady) return;
    const newItem = {
      type: "appetizer",
      ...selectedAppetizer,
      quantity: totalAppetizers,
      price: selectedAppetizer.basePrice,
      img: selectedAppetizer.img,
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
        <h2>🍲 Soups</h2>

        {/* Quantity Picker */}
        <PeopleCount setPeople={setTotalAppetizers} value={totalAppetizers} />
        <div className="grid-container">
          {/* Drink Selection */}
          <h2>Choose Your Soup:</h2>
          <div className="grid">
            {appetizerOptions.map((appetizer) => (
              <div
                key={appetizer.name}
                className={`option-card ${
                  selectedAppetizer?.name === appetizer.name ? "selected" : ""
                }`}
                onClick={() => setSelectedAppetizer(appetizer)}
              >
                <img
                  src={appetizer.img}
                  alt={appetizer.name}
                  className="product-img"
                />
                <p>{appetizer.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Summary + Add to Cart */}
        {isReady && (
          <>
            <img
              src={selectedAppetizer.img}
              alt={selectedAppetizer.name}
              className="selected-tamale-img"
            />
            <p>
              {totalAppetizers} {selectedAppetizer.name} — ${subtotal}
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

export default AppetizerSection;
