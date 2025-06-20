import { useState } from "react";

import rajastamale from "../assets/rajastamale.jpg";
import chickentamale from "../assets/chickentamale.jpg";
import cornporktamale from "../assets/cornporktamale.jpg";
import bananaleafchicken from "../assets/bananaleafchicken.jpg";
import bananaleafpork from "../assets/bananaleafpork.jpg";
import vegantamale from "../assets/cheeseredsauce.jpg";
import sweet from "../assets/sweettamale.png";

const tamaleOptions = [
  { name: "Rajas Tamales", image: rajastamale, basePrice: 48 },
  { name: "Chicken Tamales-Corn Husk ", image: chickentamale, basePrice: 48 },
  { name: "Pork Tamales-Corn Husk ", image: cornporktamale, basePrice: 48 },
  {
    name: "Chicken Tamales-Banana Leaf",
    image: bananaleafchicken,
    basePrice: 72,
  },
  { name: "Pork Tamales- Banana Leaf", image: bananaleafpork, basePrice: 72 },
  { name: "Vegan Tamales", image: vegantamale, basePrice: 60 },
  { name: "Sweet Tamales", image: sweet, basePrice: 36 },
];

function TamaleSection({ onUpdate }) {
  const [selectedTamales, setSelectedTamales] = useState(
    tamaleOptions.map((t) => ({ ...t, quantity: 0 }))
  );

  const handleQuantityChange = (index, value) => {
    const updated = [...selectedTamales];
    updated[index].quantity = Number(value);
    setSelectedTamales(updated);

    // ✅ Update parent with only selected tamales
    if (onUpdate) {
      onUpdate(updated.filter((t) => t.quantity > 0));
    }
  };

  return (
    <div className="tamale-section">
      <h2>TAMALES ✨</h2>
      {/* Tamale Selection Cards */}
      <div className="options">
        {selectedTamales.map((tamale, index) => (
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

export default TamaleSection;
