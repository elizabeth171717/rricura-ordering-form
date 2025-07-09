import React from "react";

const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

const CustomerInfo = ({
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  customerPhone,
  setCustomerPhone,
}) => {
  return (
    <div>
      <h3>Customer Information</h3>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Customer Phone"
        value={customerPhone}
        onChange={(e) => {
          const input = e.target.value.replace(/\D/g, ""); // Remove non-digits
          if (input.length <= 10) {
            const formatted = formatPhoneNumber(input);
            setCustomerPhone(formatted);
          }
        }}
        required
      />
    </div>
  );
};

export default CustomerInfo;
