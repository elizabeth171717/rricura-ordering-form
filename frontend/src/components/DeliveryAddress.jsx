import React, { useState } from "react";

function DeliveryAddress({ onAddressChange }) {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));

    if (onAddressChange) {
      onAddressChange({ ...address, [name]: value });
    }
  };

  return (
    <div>
      <h2>Delivery Address</h2>

      <input
        type="text"
        name="street"
        placeholder="Street Address"
        value={address.street}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="zip"
        placeholder="ZIP Code"
        value={address.zip}
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default DeliveryAddress;
