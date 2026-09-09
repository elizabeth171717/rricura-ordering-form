import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PeopleCount from "./PeopleCount/PeopleCount";
import { CartContext } from "../Cartcontext/CartContext";
import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "anahuac"; // 👈 your restaurant/client ID
const RESTAURANT_SLUG = "rricura-tamales";
const CURRENT_VIEW = "catering";




const Guisados = () => {
  const { addToCart: addToCartContext } = useContext(CartContext);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGuisado, setSelectedGuisado] = useState(null);
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

  // 2️⃣ Get soup section
  const guisadoSection = menuData?.sections?.find(
    (s) => s.section?.toLowerCase() === "guisados",
  );

  // 3️⃣ Flatten items from soup section only
  const allGuisados = [
    ...(guisadoSection?.groups?.flatMap((g) => g.items) || []),
    ...(guisadoSection?.items || []),
  ];

  const getItemPrice = (item) => {
  return (
    item.prices?.[CURRENT_VIEW] ??
    item.basePrice ??
    0
  );
};

  // 4️⃣ Derived value: isReady
  const isReady = selectedGuisado && quantity && quantity >= 1;

  // 5️⃣ Subtotal
   const subtotal = isReady
  ? (getItemPrice(selectedGuisado) * quantity).toFixed(2)
  : null;


  // 6️⃣ Add to cart
  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "guisado",
      id: selectedGuisado.id,
      name: selectedGuisado.name,
      description: selectedGuisado.description,
     
      price: getItemPrice(selectedGuisado),
      quantity,
      img: selectedGuisado.image || null,
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
    setSelectedGuisado(null);
    setQuantity(null);
    setShowStickySummary(false);
  };

  const handleKeepShopping = () => {
    setSelectedGuisado(null);
    setQuantity(null);
    setShowStickySummary(false);
    navigate("/OnlineOrdering/guisados");
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
          {allGuisados.map((guisado) => (
            <div
              key={guisado.id}
              className={`option-card ${
                selectedGuisado?.id === guisado.id ? "selected" : ""
              }`}
              onClick={() => setSelectedGuisado(guisado)}
            >
              {guisado.image && (
                <img src={guisado.image} alt={guisado.name} className="product-img" />
              )}
              <p>{guisado.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary + Add to Cart */}
      {isReady && showStickySummary && (
        <div className="summary-block">
          <div className="summary-img">
            {selectedGuisado.image && (
              <img src={selectedGuisado.image} alt={selectedGuisado.name} />
            )}
          </div>
          <div className="summary-details">
            <p>
              {quantity} {selectedGuisado.name} — ${subtotal}
            </p>
            {selectedGuisado.description && (
              <p className="description">{selectedGuisado.description}</p>
            )}
            <button onClick={handleAddToCart} className="add-btn">
              Add to Cart
            </button>
            <span onClick={handleKeepShopping} className="keep-shopping-text">
              Cancel
            </span>
          </div>
        </div>
      )}

      {/* Added popup */}
      {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
    </div>
  );
};
export default Guisados;

