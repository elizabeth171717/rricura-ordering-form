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

// Determine the backend URL based on the environment
const BACKEND_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_DEVELOPMENT;

const tamaleOptions = [
  { name: "Rajas", price: 4.0, image: rajastamale },
  {
    name: "ChickenCornHusk",
    price: 4.0,
    image: chickentamale,
  },
  { name: "PorkCornHusk", price: 4.0, image: cornporktamale },
  {
    name: "ChickenBananaLeaf",
    price: 6.0,
    image: bananaleafchicken,
  },
  { name: "Sweet", price: 3.0, image: sweet },

  { name: "PorkBananaLeaf", price: 6.0, image: bananaleafpork },
  { name: "Vegan", price: 5.0, image: vegantamale },
];

const BulkOrderForm = () => {
  const [quantity, setQuantity] = useState("");
  const [selectedTamale, setSelectedTamale] = useState(null);
  const [sourCream, setSourCream] = useState(false);
  const [salsaVerde, setSalsaVerde] = useState(false);
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
  const deliveryFee = 5.0;
  const taxRate = 0.08;

  // Base subtotal calculation (Tamales + Sides)
  const tamaleSubtotal =
    quantity && selectedTamale ? quantity * selectedTamale.price : 0;
  const sidesSubtotal = sourCream * 5 + salsaVerde * 5;
  const subtotal = tamaleSubtotal + sidesSubtotal;

  // Tax and final total
  const tax = subtotal * taxRate;
  const total = subtotal + tax + (subtotal > 0 ? deliveryFee : 0);

  // Handle address change
  const handleAddressChange = (updatedAddress) => {
    setDeliveryAddress(updatedAddress);
  };

  const resetForm = () => {
    setQuantity("");
    setSelectedTamale(null);
    setSourCream(false);
    setSalsaVerde(false);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setSelectedDate("");
    setSelectedTime("");
    setDeliveryAddress({
      street: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now(); // Marca de tiempo actual
    const randomString = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase(); // 4 caracteres aleatorios
    return `TML-${timestamp}-${randomString}`;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple clicks
    if (isSubmitting) return;

    if (
      !quantity ||
      !selectedTamale ||
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
    // Disable the button
    setIsSubmitting(true);

    const orderData = {
      orderNumber,
      quantity,
      tamale: selectedTamale.name,
      sourCream: sourCream ? 5.0 : 0,
      salsaVerde: salsaVerde ? 5.0 : 0,
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
      setShowModal(true); // Show modal on success
      resetForm(); // Clear the form after submission
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order.");
    } finally {
      setIsSubmitting(false); // Re-enable button after completion (optional)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <img className="logo" src={Logo} />
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
      <h5>
        We required a 2 days advanced notice in all orders, We do not deliver
        Sundays!
      </h5>
      <div className="form-container">
        <div className="left">
          <h2>How many Tamales do you need?</h2>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            <option value="">Select</option>
            {[12, 24, 30, 50, 100, 200].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <h2>Choose your tamale:</h2>
          <div className="tamale-options">
            {tamaleOptions.map((tamale) => (
              <div
                key={tamale.name}
                className={`tamale-card ${
                  selectedTamale?.name === tamale.name ? "selected" : ""
                }`}
                onClick={() => setSelectedTamale(tamale)}
              >
                <img src={tamale.image} alt={tamale.name} />
                <p>{tamale.name.replace(/([A-Z])/g, " $1").trim()}</p>
              </div>
            ))}
          </div>

          {/* Side Selection (Checkboxes) */}
          <h2>Dont forget to add</h2>
          <div className="side-selection">
            <label>
              <input
                type="checkbox"
                checked={sourCream}
                onChange={() => setSourCream(!sourCream)}
              />
              Sour Cream ($5.00)
            </label>

            <label>
              <input
                type="checkbox"
                checked={salsaVerde}
                onChange={() => setSalsaVerde(!salsaVerde)}
              />
              Salsa Verde ($5.00)
            </label>
          </div>

          <div className="price-breakdown">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (8%): ${subtotal > 0 ? tax.toFixed(2) : "0.00"}</p>
            <p>
              Delivery Fee: ${subtotal > 0 ? deliveryFee.toFixed(2) : "0.00"}
            </p>
            <h2>Total: ${subtotal > 0 ? total.toFixed(2) : "0.00"}</h2>
          </div>
        </div>
        <div className="right">
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

          {/* Delivery Date and Time Components */}
          <DeliveryDateComponent onDateSelect={setSelectedDate} />
          <DeliveryTimeComponent
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />

          {/* Delivery Address Component */}

          <DeliveryAddress onAddressChange={handleAddressChange} />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !quantity || !selectedTamale}
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
