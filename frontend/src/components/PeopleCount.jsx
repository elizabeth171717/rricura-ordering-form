import React, { useEffect, useState } from "react";

const PeopleCount = ({ setPeople, value }) => {
  const [quantity, setQuantity] = useState(value ?? "");

  const [dropdownValue, setDropdownValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value === null) {
      setQuantity("");
      setDropdownValue("");
      setInputValue("");
      return;
    }

    if (value !== undefined) {
      setQuantity(value);

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
    if (quantity && quantity >= 12) {
      setPeople(quantity);
    } else {
      setPeople(null);
    }
  }, [quantity, setPeople]);

  const handleDropdownChange = (e) => {
    const val = Number(e.target.value);
    setDropdownValue(val);
    setInputValue("");
    setQuantity(val);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setDropdownValue("");

    const number = Number(val);
    if (!isNaN(number) && number >= 12) {
      setQuantity(number);
    } else {
      setQuantity(null); // 💥 Reset when input is invalid or empty
    }
  };

  return (
    <div className="people-container">
      <div className="select-number">
        <div className="question">
          <label style={{ display: "block", marginBottom: "8px" }}>
            <p> How many would you like:</p>
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
            <p>Or enter a custom number:</p>
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
