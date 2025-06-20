import { useState } from "react";

import blackBean from "../assets/blackbeansoup.jpg";
import chickenSoup from "../assets/chickensoup.jpg";
import esquite from "../assets/esquite.jpg";

const appetizerOptions = [
  { name: "Black Bean Soup", image: blackBean, basePrice: 48 },
  { name: "Chicken Soup", image: chickenSoup, basePrice: 48 },
  { name: "Esquite", image: esquite, basePrice: 48 },
];

function AppetizerSection({ onUpdate }) {
  const [selectedAppetizers, setSelectedAppetizers] = useState(
    appetizerOptions.map((t) => ({ ...t, quantity: 0 }))
  );

  const handleQuantityChange = (index, value) => {
    const updated = [...selectedAppetizers];
    updated[index].quantity = Number(value);
    setSelectedAppetizers(updated);

    // ✅ Update parent with only selected tamales
    if (onUpdate) {
      onUpdate(updated.filter((t) => t.quantity > 0));
    }
  };

  return (
    <div className="Appetizer-section">
      <h2>SOUPS && ANTOJOS ✨</h2>
      <div className="options">
        {selectedAppetizers.map((tamale, index) => (
          <div key={tamale.name} className="tamale-card">
            <img src={tamale.image} alt={tamale.name} />
            <div className="tamale-descrition">
              <h3>{tamale.name.replace(/([A-Z])/g, " $1").trim()}</h3>
              <p>Sold by dozen - ${tamale.basePrice} per dozen</p>
            </div>
            <div className="tamale-quantity">
              <select
                value={tamale.quantity || ""}
                onChange={(e) =>
                  handleQuantityChange(index, Number(e.target.value))
                }
              >
                <option value="" disabled>
                  Select
                </option>
                <option value={0}>Remove</option> {/* Add this line */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} Dozen{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppetizerSection;
