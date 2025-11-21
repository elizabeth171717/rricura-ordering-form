import { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import PeopleCount from "./PeopleCount";
import Footer from "./Footer";
import { BACKEND_URL } from "../constants/constants";
const CLIENT_ID = "universalmenu"; // 👈 your restaurant/client ID

// Local placeholder images (for fallback only)
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
  { name: "Agua De Pina", value: "agua de pina", img: pina },
  { name: "Agua de Jamaica", value: "agua de jamaica", img: jamaica },
  { name: "Agua de Melon", value: "agua de melon", img: melon },
  { name: "Agua de Sandia", value: "agua de sandia", img: sandia },
  { name: "Soft Drinks", value: "soft drinks", img: sodas },
  { name: "Water Bottle", value: "water bottle", img: water },
  { name: "Champurrado", value: "champurrado", img: champurrado },
];

const DrinkSection = () => {
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useContext(CartContext);

  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [totalDrinks, setTotalDrinks] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Fetch Universal Menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/${CLIENT_ID}/menu`);
        const data = await res.json();
        setMenuData(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // ✅ Match the selected drink to Universal Menu
  const selectedFromMenu = useMemo(() => {
    if (!menuData || !selectedDrink) return null;

    const allItems =
      menuData?.sections?.flatMap((section) =>
        (section.groups || []).flatMap((group) => group.items || [])
      ) || [];

    const normalize = (v) =>
      String(v || "")
        .trim()
        .toLowerCase();

    return allItems.find((item) => {
      const itemName = normalize(item.name);
      const localName = normalize(selectedDrink.name);
      return itemName.includes(localName) || localName.includes(itemName);
    });
  }, [menuData, selectedDrink]);

  const isReady = selectedFromMenu && totalDrinks && totalDrinks >= 1;
  const price = selectedFromMenu ? selectedFromMenu.price : 0;
  const subtotal = isReady ? (price * totalDrinks).toFixed(2) : null;

  // ✅ Add to cart with all Universal Menu data
  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "drink",
      name: selectedFromMenu.name,
      description: selectedFromMenu.description,
      quantity: totalDrinks,
      price: selectedFromMenu.price,
      img: selectedFromMenu.image || selectedDrink.img, // Universal menu first
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

        {/* Drink Options */}
        <div className="grid-container">
          <h2>Choose Your Drink:</h2>
          <div className="grid">
            {drinkOptions.map((drink) => (
              <div
                key={drink.value}
                className={`option-card ${
                  selectedDrink?.value === drink.value ? "selected" : ""
                }`}
                onClick={() => setSelectedDrink(drink)}
              >
                <img src={drink.img} alt={drink.name} className="product-img" />
                <p>{drink.name}</p>
              </div>
            ))}
          </div>
        </div>
        {isReady && selectedFromMenu && (
          <>
            {/* ✅ Only use Universal Menu image */}
            {selectedFromMenu.image && (
              <img
                src={selectedFromMenu.image}
                alt={selectedFromMenu.name}
                className="selected-tamale-img"
              />
            )}

            <p>
              {totalDrinks} {selectedFromMenu.name}
            </p>

            {selectedFromMenu.description && (
              <p className="description">{selectedFromMenu.description}</p>
            )}

            <p>Subtotal: ${subtotal}</p>

            <button onClick={handleAddToCart}>Add to Cart</button>
            {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
          </>
        )}

        {loading && <p>Loading menu...</p>}
      </div>
      <Footer />
    </div>
  );
};

export default DrinkSection;
