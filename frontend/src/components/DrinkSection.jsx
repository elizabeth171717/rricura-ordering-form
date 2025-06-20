import { useState } from "react";

import pina from "../assets/pina.jpg";
import jamaica from "../assets/jamaica.jpg";
import melon from "../assets/melon.png";
import sandia from "../assets/sandia.jpg";
import sodas from "../assets/sodas.jpg";
import water from "../assets/bottlewater.jpg";
import champurrado from "../assets/champurrado.jpg";

const drinkOptions = [
  { name: "Agua De Pina", image: pina, basePrice: 48 },
  { name: "Agua de Jamaica", image: jamaica, basePrice: 48 },
  { name: "Agua de Melon", image: melon, basePrice: 48 },
  { name: "Agua de Sandia", image: sandia, basePrice: 48 },
  { name: "Soft Drinks", image: sodas, basePrice: 36 },
  { name: "Bottle Water", image: water, basePrice: 36 },
  { name: "Champurrado", image: champurrado, basePrice: 48 },
];

function DrinkSection({ onUpdate }) {
  const [selectedDrinks, setSelectedDrinks] = useState(
    drinkOptions.map((t) => ({ ...t, quantity: 0 }))
  );

  const handleQuantityChange = (index, value) => {
    const updated = [...selectedDrinks];
    updated[index].quantity = Number(value);
    setSelectedDrinks(updated);

    // ✅ Update parent with only selected tamales
    if (onUpdate) {
      onUpdate(updated.filter((t) => t.quantity > 0));
    }
  };

  return (
    <div className="drinks-section">
      <h2>DRINKS ✨</h2>
      <div className="options">
        {selectedDrinks.map((tamale, index) => (
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

export default DrinkSection;
