import React, { useState } from "react";
import axios from "axios";
import DeliveryDateComponent from "../components/DeliveryDate";
import DeliveryTimeComponent from "../components/DeliveryTime";
import DeliveryAddress from "../components/DeliveryAddress";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Logo from "../assets/logo.png";
import sweet from "../assets/sweettamale.png";
import bananaleafpork from "../assets/bananaleafpork.jpg";
import bananaleafchicken from "../assets/bananaleafchicken.jpg";
import chickentamale from "../assets/chickentamale.jpg";
import rajastamale from "../assets/rajastamale.jpg";
import cornporktamale from "../assets/cornporktamale.jpg";
import vegantamale from "../assets/cheeseredsauce.jpg";
import SuccessModal from "../components/SuccessModal";

// Backend URL configuration
const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_DEVELOPMENT;

const tamaleOptions = [
  { name: "Rajas", image: rajastamale, basePrice: 48 },
  { name: "ChickenCornHusk", image: chickentamale, basePrice: 48 },
  { name: "PorkCornHusk", image: cornporktamale, basePrice: 48 },
  { name: "ChickenBananaLeaf", image: bananaleafchicken, basePrice: 72 },
  { name: "PorkBananaLeaf", image: bananaleafpork, basePrice: 72 },
  { name: "Vegan", image: vegantamale, basePrice: 60 },
  { name: "Sweet", image: sweet, basePrice: 36 },
];

const BulkOrderForm = () => {
  const [selectedTamale, setSelectedTamale] = useState(
    tamaleOptions.map((tamale) => ({ ...tamale, quantity: 0 }))
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deliveryFee = 5.0;
  const taxRate = 0.08;

  // Function to update tamale quantities
  const handleQuantityChange = (index, newQuantity) => {
    const updatedSelections = [...selectedTamale];
    updatedSelections[index].quantity = newQuantity;
    setSelectedTamale(updatedSelections);
  };

  // Calculate subtotal
  const subtotal = selectedTamale.reduce(
    (sum, tamale) => sum + tamale.basePrice * tamale.quantity,
    0
  );

  // Calculate tax and total
  const tax = subtotal * taxRate;
  const displayDeliveryFee = subtotal > 0 ? deliveryFee : 0;
  const total = subtotal + tax + (subtotal > 0 ? deliveryFee : 0);

  // Handle address change
  const handleAddressChange = (updatedAddress) => {
    setDeliveryAddress(updatedAddress);
  };

  // Reset form
  const resetForm = () => {
    setSelectedTamale(
      tamaleOptions.map((tamale) => ({ ...tamale, quantity: 0 }))
    );
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setSelectedDate(null);
    setSelectedTime("");
    setDeliveryAddress({
      street: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  // Generate order number
  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const randomString = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    return `TML-${timestamp}-${randomString}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    // Validate that at least one tamale is selected
    if (selectedTamale.every((tamale) => tamale.quantity === 0)) {
      alert("Please select at least one tamale.");
      return;
    }

    e.preventDefault();
    if (isSubmitting) return;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !selectedDate ||
      !selectedTime ||
      !deliveryAddress.street ||
      !deliveryAddress.city ||
      !deliveryAddress.state ||
      !deliveryAddress.zip
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const orderNumber = generateOrderNumber();
    setIsSubmitting(true);

    const orderData = {
      orderNumber,
      tamales: selectedTamale.filter((tamale) => tamale.quantity > 0),
      subtotal,
      tax,
      deliveryFee,
      total,
      customerName,
      customerEmail,
      customerPhone,
      deliveryDate: selectedDate.toDateString(),
      deliveryTime: selectedTime,
      deliveryAddress,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/order`, orderData);
      console.log("Order submitted:", response.data);
      setShowModal(true);
      resetForm();
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <img className="logo" src={Logo} alt="Logo" />

      <h3>
        Transform you next event into a fiesta, full of flavor & Tradition!
      </h3>
      <div className="icon-container">
        <a
          href="https://www.instagram.com/r_ricura/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61566890440038"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
      </div>
      <div className="form-container">
        <div className="left">
          {/* Tamale Selection Cards */}
          <div className="tamale-options">
            {selectedTamale.map((tamale, index) => (
              <div key={tamale.name} className="tamale-card">
                <img src={tamale.image} alt={tamale.name} />
                <div className="tamale-descrition">
                  <h3>{tamale.name.replace(/([A-Z])/g, " $1").trim()}</h3>
                  <p>${tamale.basePrice} per dozen (12 tamales)</p>
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

          <div className="selected-items">
            {selectedTamale
              .filter((tamale) => tamale.quantity > 0) // Only show selected tamales
              .map((tamale, index) => (
                <h2 key={index}>
                  {tamale.quantity} Dozen{tamale.quantity > 1 ? "s" : ""}{" "}
                  {tamale.name}
                </h2>
              ))}
          </div>

          <div className="price-breakdown">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (8%): ${tax.toFixed(2)}</p>
            <p>Delivery Fee: ${displayDeliveryFee.toFixed(2)}</p>
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
        </div>
        <div className="right">
          <div>
            {/* Delivery Date and Time Components */}
            <DeliveryDateComponent onDateSelect={setSelectedDate} />
          </div>
          <div>
            <DeliveryTimeComponent
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
            />
          </div>
          <div>
            <h2>Customer Information</h2>
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
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
          </div>
          <div>
            {/* Delivery Address Component */}

            <DeliveryAddress onAddressChange={handleAddressChange} />
          </div>
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              selectedTamale.every((tamale) => tamale.quantity === 0)
            }
            className={`submit-button ${isSubmitting ? "disabled" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </div>
      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
    </form>
  );
};

export default BulkOrderForm;
