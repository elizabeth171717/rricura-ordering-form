import { useState } from "react";

import salsaverde from "../assets/salsaverde.jpg";
import sourcream from "../assets/sourcream.jpg";

const sideOptions = [
  {
    name: "Salsa verde",
    image: salsaverde,
    options: [
      { size: "Small", basePrice: 6 },
      { size: "Large", basePrice: 12 },
    ],
  },
  {
    name: "Sour cream",
    image: sourcream,
    options: [
      { size: "Small", basePrice: 6 },
      { size: "Large", basePrice: 12 },
    ],
  },
];

function SideSection({ onUpdate }) {
  const [selectedSides, setSelectedSides] = useState(() => {
    return sideOptions.flatMap((item) =>
      item.options.map((opt) => ({
        name: item.name,
        image: item.image,
        size: opt.size,
        basePrice: opt.basePrice,
        quantity: 0,
        unit: "x",
      }))
    );
  });

  const toggleSelection = (index) => {
    const updated = [...selectedSides];
    updated[index].quantity = updated[index].quantity === 0 ? 1 : 0;
    setSelectedSides(updated);

    const filtered = updated.filter((s) => s.quantity > 0);
    if (onUpdate) onUpdate(filtered);
  };

  return (
    <div className="Sides-section">
      <h2>SIDES ✨</h2>
      <div className="side-options">
        {selectedSides.map((item, index) => (
          <div key={`${item.name}-${item.size}`}>
            <img src={item.image} alt={item.name} />
            <h3>
              {item.name} ({item.size})
            </h3>
            <p>${item.basePrice} each</p>
            <button onClick={() => toggleSelection(index)}>
              {item.quantity > 0 ? "Remove" : "Add"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideSection;
