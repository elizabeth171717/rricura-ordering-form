import { useState, useEffect } from "react";

const PromoCode = ({ subtotal, onApply }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const upper = code.trim().toUpperCase();

      if (upper === "FIRST10") {
        const newDiscount = subtotal * 0.1;
        setDiscount(newDiscount);
        onApply(newDiscount, upper);
      } else {
        setDiscount(0);
        onApply(0, "");
      }
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(timeout);
  }, [code, subtotal, onApply]);

  return (
    <div style={{ marginTop: "1rem" }}>
      <label>Promo Code:</label>
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          value={code}
          placeholder="Enter promo code"
          onChange={(e) => setCode(e.target.value)}
        />
        {discount > 0 && (
          <p style={{ color: "green" }}>
            ✅ Code <strong>{code.toUpperCase()}</strong> applied – You saved $
            {discount.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PromoCode;
