import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import PeopleCount from "./PeopleCount";
import Footer from "./Footer";

// Drink images
import pina from "../assets/pina.jpg";
import jamaica from "../assets/jamaica.jpg";
import melon from "../assets/melon.png";
import sandia from "../assets/sandia.jpg";
import sodas from "../assets/sodas.jpg";
import water from "../assets/bottlewater.jpg";
import champurrado from "../assets/champurrado.jpg";

// Cart Context
import { CartContext } from "../Cartcontext/CartContext";

const drinkOptions = [
  { name: "Agua De Piña", img: pina, basePrice: 4 },
  { name: "Agua de Jamaica", img: jamaica, basePrice: 4 },
  { name: "Agua de Melón", img: melon, basePrice: 4 },
  { name: "Agua de Sandía", img: sandia, basePrice: 4 },
  { name: "Soft Drinks", img: sodas, basePrice: 3 },
  { name: "Bottle Water", img: water, basePrice: 3 },
  { name: "Champurrado", img: champurrado, basePrice: 4 },
];

const DrinkSection = () => {
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useContext(CartContext);

  const [totalDrinks, setTotalDrinks] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const isReady = selectedDrink && totalDrinks && totalDrinks >= 1;
  const subtotal = isReady
    ? (selectedDrink.basePrice * totalDrinks).toFixed(2)
    : null;

  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "drink",
      ...selectedDrink,
      quantity: totalDrinks,
      price: selectedDrink.basePrice,
      img: selectedDrink.img,
    };

    addToCartContext(newItem);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  return (
    <div className="drinks-container">
      <Navigation />
      <div className="step-container">
        <span onClick={() => navigate(-1)} className="back-button">
          ⬅ Back to Tamales
        </span>
        <h2>🥤 Drinks</h2>

        {/* Quantity Picker */}
        <PeopleCount setPeople={setTotalDrinks} value={totalDrinks} />
        <div className="grid-container">
          {/* Drink Selection */}
          <h2>Choose Your Drink:</h2>
          <div className="grid">
            {drinkOptions.map((drink) => (
              <div
                key={drink.name}
                className={`option-card ${
                  selectedDrink?.name === drink.name ? "selected" : ""
                }`}
                onClick={() => setSelectedDrink(drink)}
              >
                <img src={drink.img} alt={drink.name} className="product-img" />
                <p>{drink.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Summary + Add to Cart */}
        {isReady && (
          <>
            <img
              src={selectedDrink.img}
              alt={selectedDrink.name}
              className="selected-tamale-img"
            />
            <p>
              {totalDrinks} {selectedDrink.name} — ${subtotal}
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

export default DrinkSection;
