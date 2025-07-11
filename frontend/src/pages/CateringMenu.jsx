// src/pages/Menu.jsx
import React, { useState } from "react";
import IngredientsModal from "../components/Ingridients";
import { useNavigate } from "react-router-dom";
import TamaleSection from "../components/TamaleSection";
import DrinkSection from "../components/DrinkSection";
import AppetizerSection from "../components/AppetizerSection";
import SideSection from "../components/SideSection";
import PromoCode from "../components/PromoCode";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const CateringMenu = () => {
  const navigate = useNavigate();
  const [selectedTamales, setSelectedTamales] = useState([]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [selectedAppetizers, setSelectedAppetizers] = useState([]);
  const [selectedSides, setSelectedSides] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  // ✅ Only needed once, here
  const allItems = [
    ...selectedTamales,
    ...selectedDrinks,
    ...selectedAppetizers,
    ...selectedSides,
  ];
  const subtotal = allItems.reduce(
    (sum, item) => sum + item.basePrice * item.quantity,
    0
  );

  // Handle promo update from child component
  const handlePromoApply = (discountAmount, code) => {
    setDiscount(discountAmount);
    setPromoCode(code);
  };

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

    // ✅ USE subtotal here (this was the missing piece you mentioned)
    localStorage.setItem("menuSubtotal", subtotal.toFixed(2)); // 👈 right here
    localStorage.setItem("promoCode", promoCode); // ✅ add this
    localStorage.setItem("menuDiscount", discount.toFixed(2)); // ✅ add this

    navigate("/checkout");
  };

  return (
    <div className="menu-page">
      <Navigation />
      <div className="title-container">
        <div className="title">
          <h2>CATERING MENU 🍴</h2>
        </div>
        <div className="sub-title">
          <h3>
            Mix and match tamales by the dozen, add drinks ,salsa verde and
            more.👉{" "}
            <span
              onClick={() => setShowIngredients(true)}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              View Ingredients
            </span>
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
        <>
          {/* Spacer only appears when there are items */}
          <div style={{ height: "190px" }} />
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
                  {item.quantity} {item.size || item.unit || "x"} {item.name} –
                  ${(item.basePrice * item.quantity).toFixed(2)}
                </p>
              ))}
            <PromoCode subtotal={subtotal} onApply={handlePromoApply} />
            {/* ✅ Subtotal goes here */}
            <p>
              <strong>Subtotal: ${(subtotal - discount).toFixed(2)}</strong>
            </p>

            <button onClick={handleNext} className="proceed-button">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <IngredientsModal
        isOpen={showIngredients}
        onClose={() => setShowIngredients(false)}
      />
      <Footer />
    </div>
  );
};

export default CateringMenu;
