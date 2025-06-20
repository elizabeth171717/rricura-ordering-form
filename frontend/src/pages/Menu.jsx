// src/pages/Menu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TamaleSection from "../components/TamaleSection";
import DrinkSection from "../components/DrinkSection";
import AppetizerSection from "../components/AppetizerSection";
import SideSection from "../components/SideSection";

const Menu = () => {
  const navigate = useNavigate();
  const [selectedTamales, setSelectedTamales] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedAppetizers, setSelectedAppetizers] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);

  const handleNext = () => {
    const validTamales = selectedTamales.filter((t) => t.quantity > 0);
    const validDrinks = selectedDrinks.filter((d) => d.quantity > 0);
    const validAppetizers = selectedAppetizers.filter((d) => d.quantity > 0);
    const validSides = selectedSides.filter((d) => d.quantity > 0);
    // Add sides, apps, etc. when you're ready

    const hasItems =
      validTamales.length ||
      validDrinks.length ||
      validAppetizers.length ||
      validSides.length;

    if (!hasItems) {
      alert("Please select at least one item from the menu.");
      return;
    }

    // Save only what's needed
    localStorage.setItem("selectedTamales", JSON.stringify(validTamales));
    localStorage.setItem("selectedDrinks", JSON.stringify(validDrinks));
    localStorage.setItem("selectedAppetizers", JSON.stringify(validAppetizers));
    localStorage.setItem("selectedSides", JSON.stringify(validSides));
    // Do the same for sides/apps later

    navigate("/checkout");
  };

  return (
    <div className="menu-page">
      <img className="logo" src="/logo.png" alt="Logo" />
      <div className="title-container">
        <div className="title">
          <h2>CATERING MENU 🍴</h2>
        </div>
        <div className="sub-title">
          <h3>
            Mix and match tamales, add aguas frescas, soups, and salsa verde for
            the full experience!
          </h3>
        </div>
      </div>
      <div className="forms-container">
        <div className="left-container">
          <TamaleSection onUpdate={setSelectedTamales} />
          <SideSection onUpdate={setSelectedSides} />
        </div>
        <div className="right-container">
          <DrinkSection onUpdate={setSelectedDrinks} />
          <AppetizerSection onUpdate={setSelectedAppetizers} />
        </div>
      </div>
      {[
        ...selectedTamales,
        ...selectedDrinks,
        ...selectedAppetizers,
        ...selectedSides,
      ].filter((item) => item.quantity > 0).length > 0 && (
        <div className="fixed-checkout-btn">
          {[
            ...selectedTamales,
            ...selectedDrinks,
            ...selectedAppetizers,
            ...selectedSides,
          ]
            .filter((item) => item.quantity > 0)
            .map((item, i) => (
              <p key={i}>
                {item.quantity} {item.unit || "x"} {item.name} – $
                {(item.basePrice * item.quantity).toFixed(2)}
              </p>
            ))}

          <button onClick={handleNext} className="proceed-button">
            Proceed to Checkout
          </button>
        </div>
      )}
      <div style={{ height: "150px" }} />
    </div>
  );
};

export default Menu;
