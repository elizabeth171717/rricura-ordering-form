import React, { useState } from "react";

const TipSelector = ({ subtotal, onTipChange }) => {
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState("");

  const percentages = [10, 15, 18, 20];

  const handlePercentageClick = (percent) => {
    const tip = parseFloat(((percent / 100) * subtotal).toFixed(2));
    setSelectedTip(percent);
    setCustomTip("");
    onTipChange(tip);
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;

    // Allow empty input so user can clear it
    setCustomTip(value);

    // Only update tip if value is a valid number
    const parsed = parseFloat(value);
    if (!isNaN(parsed) && parsed >= 0) {
      setSelectedTip(null);
      onTipChange(parsed);
    } else {
      // If input is empty or invalid, treat tip as 0
      onTipChange(0);
    }
  };

  return (
    <div className="tip-container">
      <h3>Add a Tip</h3>
      <div className="tip-selection">
        {percentages.map((percent) => {
          const tipAmount = (percent / 100) * subtotal;
          return (
            <button
              type="button" // <- This prevents form submission
              key={percent}
              onClick={() => handlePercentageClick(percent)}
              className={`tip-button ${
                selectedTip === percent ? "selected" : ""
              }`}
            >
              {percent}% ${tipAmount.toFixed(2)}
            </button>
          );
        })}
      </div>
      <div>
        <p>Or enter a custom tip amount:</p>
        <input
          type="number"
          min="0"
          step="0.01"
          value={customTip}
          onChange={handleCustomChange}
          placeholder="e.g. 5.00"
        />
      </div>
    </div>
  );
};

export default TipSelector;
