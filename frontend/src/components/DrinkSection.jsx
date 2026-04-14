import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PeopleCount from "./PeopleCount/PeopleCount";
import { CartContext } from "../Cartcontext/CartContext";
import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "anahuac"; // 👈 your restaurant/client ID
const RESTAURANT_SLUG = "rricura-tamales";

const DrinksSection = () => {
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [showStickySummary, setShowStickySummary] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // 1️⃣ Fetch Universal Menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`,
        );
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

  // 2️⃣ Get Drinks section
  const drinksSection = menuData?.sections?.find(
    (s) => s.section?.toLowerCase() === "drinks",
  );

  // 3️⃣ Flatten items from Drinks section only
  const allDrinks = [
    ...(drinksSection?.groups?.flatMap((g) => g.items) || []),
    ...(drinksSection?.items || []),
  ];

  // 4️⃣ Derived value: isReady
  const isReady = selectedDrink && quantity && quantity >= 1;

  // 5️⃣ Subtotal
  const subtotal = isReady ? (selectedDrink.price * quantity).toFixed(2) : null;

  // 6️⃣ Add to cart
  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "drink",
      id: selectedDrink.id,
      name: selectedDrink.name,
      description: selectedDrink.description,
      price: selectedDrink.price,
      quantity,
      img: selectedDrink.image || null,
    };

   
 // Add to global cart context
const success = addToCartContext({
  ...newItem,
  orderType: "catering"
});


if (!success) {
  alert("Monday Orders must be placed separately.");
  return;
}


    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);

    // Reset selections
    setSelectedDrink(null);
    setQuantity(null);
    setShowStickySummary(false);
  };

  const handleKeepShopping = () => {
    setSelectedDrink(null);
    setQuantity(null);
    setShowStickySummary(false);
    navigate("/OnlineOrdering/drinks");
  };

  // 7️⃣ Show sticky summary automatically when ready
  useEffect(() => {
    if (isReady) {
      setShowStickySummary(true);
    }
  }, [isReady]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading drinks...</p>;

  return (
    <div className="menu-section-container">
      {/* Quantity picker */}
      <PeopleCount value={quantity} setPeople={setQuantity} />

      {/* Drinks selection grid */}
      <div className="grid-container">
        <div className="grid">
          {allDrinks.map((drink) => (
            <div
              key={drink.id}
              className={`option-card ${
                selectedDrink?.id === drink.id ? "selected" : ""
              }`}
              onClick={() => setSelectedDrink(drink)}
            >
              {drink.image && (
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="product-img"
                />
              )}
              <p>{drink.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary + Add to Cart */}
      {isReady && showStickySummary && (
        <div className="summary-block">
          <div className="summary-img">
            {selectedDrink.image && (
              <img src={selectedDrink.image} alt={selectedDrink.name} />
            )}
          </div>
          <div className="summary-details">
            <p>
              {quantity} {selectedDrink.name} — ${subtotal}
            </p>
            {selectedDrink.description && (
              <p className="description">{selectedDrink.description}</p>
            )}
            <button onClick={handleAddToCart} className="add-btn">
              Add to Cart
            </button>
            <span onClick={handleKeepShopping} className="keep-shopping-text">
              Keep shopping
            </span>
          </div>
        </div>
      )}

      {/* Added popup */}
      {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
    </div>
  );
};

export default DrinksSection;
