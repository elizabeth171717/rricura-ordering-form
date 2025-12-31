import React, { useEffect, useState } from "react";

const PeopleCount = ({ setPeople, value }) => {
  const [tamales, setTamales] = useState(value || ""); // final tamale count
  const [dropdownValue, setDropdownValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Sync local state with incoming prop changes (like after page load)
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setTamales(value);

      // Set dropdown or input accordingly
      if ([12, 24, 36, 48, 60, 72, 100].includes(value)) {
        setDropdownValue(value);
        setInputValue("");
      } else {
        setDropdownValue("");
        setInputValue(value);
      }
    }
  }, [value]);

  useEffect(() => {
    if (tamales && tamales >= 12) {
      setPeople(tamales);
    } else {
      setPeople(null); // 💥 Invalid entry should clear selection
    }
  }, [tamales, setPeople]);

  const handleDropdownChange = (e) => {
    const val = Number(e.target.value);
    setDropdownValue(val);
    setInputValue("");
    setTamales(val);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setDropdownValue("");

    const number = Number(val);
    if (!isNaN(number) && number >= 12) {
      setTamales(number);
    } else {
      setTamales(null); // 💥 Reset when input is invalid or empty
    }
  };

  return (
    <div className="people-container">
      <div className="select-number">
        <div className="question">
          <label style={{ display: "block", marginBottom: "8px" }}>
            <h3> How many would you like:</h3>
          </label>
        </div>
        <div className="number">
          <select
            value={dropdownValue}
            onChange={handleDropdownChange}
            style={{ marginBottom: "12px", padding: "6px" }}
          >
            <option value="">Choose</option>
            {[12, 24, 36, 48, 60, 72, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="select-number">
        <div className="question">
          <label htmlFor="customTamales">
            <h3>Or enter a custom number:</h3>
          </label>
        </div>
        <div className="number">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Minimum 12"
            id="customTamales"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              padding: "6px",
              fontSize: "16px",
              marginTop: "5px",
              width: "100%",
              maxWidth: "250px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PeopleCount;
