import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PeopleCount from "./PeopleCount/PeopleCount";
import { CartContext } from "../Cartcontext/CartContext";
import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "universalmenu";

const SoupsSection = () => {
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [showStickySummary, setShowStickySummary] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // 1️⃣ Fetch Universal Menu
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

  // 2️⃣ Get Drinks section
  const soupSection = menuData?.sections?.find(
    (s) => s.section?.toLowerCase() === "soups"
  );

  // 3️⃣ Flatten items from Drinks section only
  const allSoups = [
    ...(soupSection?.groups?.flatMap((g) => g.items) || []),
    ...(soupSection?.items || []),
  ];

  // 4️⃣ Derived value: isReady
  const isReady = selectedSoup && quantity && quantity >= 1;

  // 5️⃣ Subtotal
  const subtotal = isReady ? (selectedSoup.price * quantity).toFixed(2) : null;

  // 6️⃣ Add to cart
  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "soup",
      id: selectedSoup.id,
      name: selectedSoup.name,
      description: selectedSoup.description,
      price: selectedSoup.price,
      quantity,
      img: selectedSoup.image || null,
    };

    addToCartContext(newItem);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);

    // Reset selections
    setSelectedSoup(null);
    setQuantity(null);
    setShowStickySummary(false);
  };

  const handleKeepShopping = () => {
    setSelectedSoup(null);
    setQuantity(null);
    setShowStickySummary(false);
    navigate("/OnlineOrdering/soups");
  };

  // 7️⃣ Show sticky summary automatically when ready
  useEffect(() => {
    if (isReady) {
      setShowStickySummary(true);
    }
  }, [isReady]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading soups...</p>;

  return (
    <div className="menu-section-container">
      {/* Quantity picker */}
      <PeopleCount value={quantity} setPeople={setQuantity} />

      {/* Drinks selection grid */}
      <div className="grid-container">
        <div className="grid">
          {allSoups.map((soup) => (
            <div
              key={soup.id}
              className={`option-card ${
                selectedSoup?.id === soup.id ? "selected" : ""
              }`}
              onClick={() => setSelectedSoup(soup)}
            >
              {soup.image && (
                <img src={soup.image} alt={soup.name} className="product-img" />
              )}
              <p>{soup.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary + Add to Cart */}
      {isReady && showStickySummary && (
        <div className="summary-block">
          <div className="summary-img">
            {selectedSoup.image && (
              <img src={selectedSoup.image} alt={selectedSoup.name} />
            )}
          </div>
          <div className="summary-details">
            <p>
              {quantity} {selectedSoup.name} — ${subtotal}
            </p>
            {selectedSoup.description && (
              <p className="description">{selectedSoup.description}</p>
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

export default SoupsSection;
