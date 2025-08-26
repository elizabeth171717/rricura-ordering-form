import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import blackBean from "../assets/blackbeansoup.jpg";
import chickenSoup from "../assets/chickensoup.jpg";

import PeopleCount from "./PeopleCount";
import Navigation from "./Navigation";
import Footer from "./Footer";

// Cart Context
import { CartContext } from "../Cartcontext/CartContext";

const appetizerOptions = [
  {
    id: "blackbeabsoup",
    name: "Black Bean Soup",
    img: blackBean,
    basePrice: 4,
  },
  { id: "chickensoup", name: "Chicken Soup", img: chickenSoup, basePrice: 4 },
];

const AppetizerSection = () => {
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [totalAppetizers, setTotalAppetizers] = useState(null);
  const [selectedAppetizer, setSelectedAppetizer] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const isReady = selectedAppetizer && totalAppetizers && totalAppetizers >= 1;

  const subtotal = isReady
    ? (selectedAppetizer.basePrice * totalAppetizers).toFixed(2)
    : null;

  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "appetizer",
      ...selectedAppetizer,
      quantity: totalAppetizers,
      price: selectedAppetizer.basePrice,
      img: selectedAppetizer.img,
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
            <button onClick={handleAddToCart}>Add to Cart</button>
            {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppetizerSection;
