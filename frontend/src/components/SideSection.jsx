import React, { useState, useEffect, useContext } from "react";

import { CartContext } from "../Cartcontext/CartContext";
import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "universalmenu";

const SidesSection = () => {
  const { addToCart } = useContext(CartContext);

  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Manual sizing and pricing
  const sizeOptions = [
    { label: "Small", price: 5 },
    { label: "Medium", price: 8 },
    { label: "Large", price: 12 },
  ];

  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/${CLIENT_ID}/menu`);
        const data = await res.json();
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

  const sidesSection = menuData?.sections?.find(
    (s) => s.section?.toLowerCase() === "sides"
  );

  if (!sidesSection) return <p>No sides found.</p>;

  const sides = [
    ...(sidesSection.groups?.flatMap((g) => g.items) || []),
    ...(sidesSection.items || []),
  ];

  const handleSelectSize = (sideId, size) => {
    setSelectedOptions((prev) => ({ ...prev, [sideId]: size }));
    setQuantities((prev) => ({ ...prev, [sideId]: 1 }));
  };

  const updateQuantity = (sideId, amount) => {
    setQuantities((prev) => ({
      ...prev,
      [sideId]: Math.max(1, (prev[sideId] || 1) + amount),
    }));
  };

  const handleAddToCart = (side) => {
    const selectedSize = selectedOptions[side.id];
    const qty = quantities[side.id] || 1;

    if (!selectedSize) return;

    const newItem = {
      type: "side",
      id: `${side.id}-${selectedSize.label}`,
      name: `${side.name} (${selectedSize.label})`,
      img: side.image || null,
      price: selectedSize.price,
      quantity: qty,
    };

    addToCart(newItem);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="sides-container">
      <div className="grid-container">
        <div className="grid">
          {sides.map((side) => {
            const selectedSize = selectedOptions[side.id];
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
                  {sizeOptions.map((opt) => (
                    <div key={opt.label}>
                      <div
                        className={`option-card ${
                          selectedSize?.label === opt.label ? "selected" : ""
                        }`}
                        onClick={() => handleSelectSize(side.id, opt)}
                      >
                        <p>{opt.label}</p>
                        <p>${opt.price}</p>
                      </div>

                      {/* SHOW CONTROLS DIRECTLY UNDER SELECTED SIZE */}
                      {selectedSize?.label === opt.label && (
                        <div className="add-inline">
                          <button onClick={() => updateQuantity(side.id, -1)}>
                            -
                          </button>
                          <span>{qty}</span>
                          <button onClick={() => updateQuantity(side.id, 1)}>
                            +
                          </button>
                          <button
                            className="add-btn"
                            onClick={() => handleAddToCart(side)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
      </div>
    </div>
  );
};

export default SidesSection;
