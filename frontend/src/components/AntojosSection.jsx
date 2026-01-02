import { useState, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import esquite from "../assets/esquite.jpg";
import PeopleCount from "./PeopleCount";

// Cart Context
import { CartContext } from "../Cartcontext/CartContext";

const antojosOptions = [
  { id: "esquite", name: "Esquite", img: esquite, basePrice: 4 },
];

const AntojosSection = () => {
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [totalAntojos, setTotalAntojos] = useState(null);
  const [selectedAntojo, setSelectedAntojo] = useState(null);
  const [showStickySummary, setShowStickySummary] = useState(true);
  const navigate = useNavigate();
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
    setShowStickySummary(false); // 👈 THIS hides it
    // reset builder state

    setSelectedAntojo(null);
    // optional: clear saved selections
    setTotalAntojos(null);
  };

  const handleKeepShopping = () => {
    setShowStickySummary(false);
    setSelectedAntojo(null);
    setTotalAntojos(null);
    navigate("/OnlineOrdering/antojos");
  };

  useEffect(() => {
    if (isReady) {
      setShowStickySummary(true);
    }
  }, [isReady]);

  return (
    <div className="app-container">
      <div className="step-container">
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
        {isReady && showStickySummary && (
          <>
            <div className="summary-block">
              <div className="summary-img">
                <img src={selectedAntojo.img} alt={selectedAntojo.name} />
              </div>
              <div className="summary-details">
                <p>
                  {totalAntojos} {selectedAntojo.name} — ${subtotal}
                </p>
                <button onClick={handleAddToCart} className="add-btn">
                  Add to Cart
                </button>
                <span
                  onClick={handleKeepShopping}
                  className="keep-shopping-text"
                >
                  Keep shopping
                </span>
                {showPopup && (
                  <div className="cart-popup">✅ Added to cart!</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AntojosSection;
