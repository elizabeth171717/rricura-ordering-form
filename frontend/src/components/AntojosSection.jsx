import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PeopleCount from "./PeopleCount/PeopleCount";
import { CartContext } from "../Cartcontext/CartContext";
import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "universalmenu";

const AntojosSection = () => {
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAntojo, setSelectedAntojo] = useState(null);
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

  const antojitosSection = menuData?.sections?.find(
    (s) => s.section?.toLowerCase() === "antojos"
  );

  const allItems = [
    ...(antojitosSection?.groups?.flatMap((g) => g.items) || []),
    ...(antojitosSection?.items || []),
  ];

  // 3️⃣ Derived value: isReady
  const isReady = selectedAntojo && quantity && quantity >= 1;

  // 4️⃣ Subtotal
  const subtotal = isReady
    ? (selectedAntojo.price * quantity).toFixed(2)
    : null;

  // 5️⃣ Add to cart
  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "antojos",
      id: selectedAntojo.id,
      name: selectedAntojo.name,
      description: selectedAntojo.description,
      price: selectedAntojo.price,
      quantity,
      img: selectedAntojo.image || null,
    };

    addToCartContext(newItem);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);

    // Reset selections
    setSelectedAntojo(null);
    setQuantity(null);
    setShowStickySummary(false);
  };

  const handleKeepShopping = () => {
    setSelectedAntojo(null);
    setQuantity(null);
    setShowStickySummary(false);
    navigate("/OnlineOrdering/antojos");
  };

  // 6️⃣ Show sticky summary automatically when ready
  useEffect(() => {
    if (isReady) {
      setShowStickySummary(true);
    }
  }, [isReady]);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading antojitos...</p>;

  return (
    <div className="menu-section-container">
      {/* Quantity picker */}
      <PeopleCount value={quantity} setPeople={setQuantity} />

      {/* Antojitos selection grid */}
      <div className="grid-container">
        <div className="grid">
          {allItems.map((item) => (
            <div
              key={item.id}
              className={`option-card ${
                selectedAntojo?.id === item.id ? "selected" : ""
              }`}
              onClick={() => setSelectedAntojo(item)}
            >
              {item.image && (
                <img src={item.image} alt={item.name} className="product-img" />
              )}
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary + Add to Cart */}
      {isReady && showStickySummary && (
        <div className="summary-block">
          <div className="summary-img">
            {selectedAntojo.image && (
              <img src={selectedAntojo.image} alt={selectedAntojo.name} />
            )}
          </div>
          <div className="summary-details">
            <p>
              {quantity} {selectedAntojo.name} — ${subtotal}
            </p>
            {selectedAntojo.description && (
              <p className="description">{selectedAntojo.description}</p>
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

export default AntojosSection;
