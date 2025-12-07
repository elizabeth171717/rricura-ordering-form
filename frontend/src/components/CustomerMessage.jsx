// CustomerMessage.jsx
import React from "react";

export default function CustomerMessage({
  customerMessage,
  setCustomerMessage,
}) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">
        Message for the restaurant (optional)
      </label>

      <textarea
        name="customerMessage"
        placeholder="Message for the restaurant"
        value={customerMessage}
        onChange={(e) => setCustomerMessage(e.target.value)}
        className="w-full border p-2 rounded"
        rows={3}
      />
    </div>
  );
}
