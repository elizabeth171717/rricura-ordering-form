import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../Cartcontext/CartContext";
import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "rricura-tamales";

const SidesSection = () => {
  const { addToCart } = useContext(CartContext);

  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // 🔥 Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`
        );
        const data = await res.json();

        console.log("FULL MENU:", data); // 👈 DEBUG
        setMenuData(data);
      } catch (err) {
        console.error("Failed to fetch Universal Menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading sides...</p>;

  // 🔍 Find sides section

const sidesSection = menuData?.sections?.find(
  (s) => s.section?.trim().toLowerCase() === "sides"
);

  if (!sidesSection) return <p>No sides found.</p>;

  // 🔥 Get all sides (supports both grouped + non-grouped)
  const sides = [
    ...(sidesSection.groups?.flatMap((g) => g.items) || []),
    ...(sidesSection.items || []),
  ];

  // ✅ Select modifier (size)
  const handleSelectModifier = (sideId, modifier) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [sideId]: modifier,
    }));

    setQuantities((prev) => ({
      ...prev,
      [sideId]: 1,
    }));
  };

  // ➕➖ Quantity
  const updateQuantity = (sideId, amount) => {
    setQuantities((prev) => ({
      ...prev,
      [sideId]: Math.max(1, (prev[sideId] || 1) + amount),
    }));
  };

  // 🛒 Add to cart
  const handleAddToCart = (side) => {
    const selectedModifier = selectedOptions[side.id];
    const qty = quantities[side.id] || 1;

    if (!selectedModifier) return;

    const newItem = {
      type: "side",
      id: `${side.id}-${selectedModifier.id}`,
      name: `${side.name} (${selectedModifier.name})`,
      img: side.image || null,
      price: selectedModifier.price,
      quantity: qty,
    };

    addToCart(newItem);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="menu-section-container">
      <div className="grid-container">
        <div className="grid">
  {sides.map((side) => {
    const selectedModifier = selectedOptions[side.id];
    const qty = quantities[side.id] || 1;

    return (
      <div key={side.id} className="sides-card">
        <h2>{side.name}</h2>

        {side.image && (
          <img
            src={side.image}
            alt={side.name}
            className="option-card"
          />
        )}

        <div className="options-grid">
          {side.modifiers?.map((mod) => {
            const isSelected =
              selectedModifier?.id === mod.id;

            return (
              <div key={mod.id}>
                <div
                  className={`option-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleSelectModifier(side.id, mod)
                  }
                >
                  <p>{mod.name}</p>
                  <p>${mod.price}</p>
                </div>

                {isSelected && (
                  <div className="add-inline">
                    <button
                      onClick={() =>
                        updateQuantity(side.id, -1)
                      }
                    >
                      -
                    </button>

                    <span>{qty}</span>

                    <button
                      onClick={() =>
                        updateQuantity(side.id, 1)
                      }
                    >
                      +
                    </button>

                    <button
                      className="add-btn"
                      onClick={() =>
                        handleAddToCart(side)
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  })}
</div>

        {/* ✅ POPUP */}
        {showPopup && (
          <div className="cart-popup">
            ✅ Added to cart!
          </div>
        )}
      </div>
    </div>
  );
};

export default SidesSection;