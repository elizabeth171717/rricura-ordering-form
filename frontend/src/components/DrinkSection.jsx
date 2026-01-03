import { useState, useContext, useEffect, useMemo } from "react";
import PeopleCount from "./PeopleCount";
import { useNavigate } from "react-router-dom";
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
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [showStickySummary, setShowStickySummary] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [totalDrinks, setTotalDrinks] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
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
    setTimeout(() => setShowPopup(false), 3000);
    // ✅ CLOSE + RESET
    setShowStickySummary(false);
    setSelectedDrink(null);
    setTotalDrinks(null);
  };

  const handleKeepShopping = () => {
    setShowStickySummary(false);
    setSelectedDrink(null);
    setTotalDrinks(null);

    navigate("/OnlineOrdering/drinks");
  };

  useEffect(() => {
    if (isReady) {
      setShowStickySummary(true);
    }
  }, [isReady]);

  return (
    <div className="drinks-container">
      <div className="step-container">
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
        {isReady && selectedFromMenu && showStickySummary && (
          <>
            <div className="summary-block">
              <div className="summary-img">
                {/* ✅ Only use Universal Menu image */}
                {selectedFromMenu.image && (
                  <img
                    src={selectedFromMenu.image}
                    alt={selectedFromMenu.name}
                  />
                )}
              </div>
              <div className="summary-details">
                <p>
                  {totalDrinks} {selectedFromMenu.name}
                </p>

                {selectedFromMenu.description && (
                  <p className="description">{selectedFromMenu.description}</p>
                )}

                <p>Subtotal: ${subtotal}</p>

                <button onClick={handleAddToCart} className="add-btn">
                  Add to Cart
                </button>
                <span
                  onClick={handleKeepShopping}
                  className="keep-shopping-text"
                >
                  Keep shopping
                </span>
              </div>
            </div>
          </>
        )}
        {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
        {loading && <p>Loading menu...</p>}
      </div>
    </div>
  );
};

export default DrinkSection;
