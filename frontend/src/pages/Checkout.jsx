import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stripePromise } from "../stripe";
import DeliveryDateComponent from "../components/DeliveryDate";
import DeliveryTimeComponent from "../components/DeliveryTime";

import DeliveryForm from "../components/DeliveryAddress";

import TipSelector from "../components/TipSelector";

import SuccessModal from "../components/SuccessModal";

const Checkout = () => {
  // ✅ Preload Stripe as soon as this page loads
  useEffect(() => {
    stripePromise.then(() => {
      console.log("✅ Stripe.js has started downloading in the background");
    });
  }, []);

  const [tamales, setTamales] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  const [sides, setSides] = useState([]);

  useEffect(() => {
    setTamales(JSON.parse(localStorage.getItem("selectedTamales")) || []);
    setDrinks(JSON.parse(localStorage.getItem("selectedDrinks")) || []);
    setAppetizers(JSON.parse(localStorage.getItem("selectedAppetizers")) || []);
    setSides(JSON.parse(localStorage.getItem("selectedSides")) || []);
  }, []);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null); // includes fee, address, etc.

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const taxRate = 0.08;
  const navigate = useNavigate();

  // Calculate subtotal
  const allItems = [...tamales, ...drinks, ...appetizers, ...sides];
  const subtotal = allItems.reduce(
    (sum, item) => sum + item.basePrice * item.quantity,
    0
  );

  // Calculate tax and total
  const tax = subtotal * taxRate;

  const safeTip = isNaN(selectedTip) ? 0 : selectedTip;

  const total =
    subtotal + tax + (subtotal > 0 ? safeTip : 0) + (deliveryInfo?.fee || 0);

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
    if (allItems.every((item) => item.quantity === 0)) {
      alert("Please select at least one item from the menu.");
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
      !deliveryInfo
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const orderNumber = generateOrderNumber();
    setIsSubmitting(true);

    const orderData = {
      orderNumber,
      items: allItems.filter((item) => item.quantity > 0),
      subtotal,
      tax,
      tip: selectedTip || 0, // default to 0 if none selected
      total,
      customerName,
      customerEmail,
      customerPhone,
      deliveryDate: selectedDate.toDateString(),
      deliveryTime: selectedTime,
      deliveryAddress: deliveryInfo, // ✅ Correct and clean
    };

    navigate("/paymnet-page", {
      state: { orderData },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <button onClick={() => navigate(-1)} className="back-button">
        ⬅ Back to Menu
      </button>
      <h2>CHECK OUT</h2>

      <div className="form-container">
        <div className="left">
          <div className="selected-items">
            <h2>Order Summary 🤤</h2>
            {allItems.map((item, i) => (
              <p key={i}>
                {item.quantity} {item.unit || "x"} {item.name} – $
                {(item.basePrice * item.quantity).toFixed(2)}
              </p>
            ))}

            <h2>
              <strong> Subtotal: ${subtotal.toFixed(2)}</strong>
            </h2>
          </div>

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
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
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
            {/* Delivery Address Component */}

            <DeliveryForm onFeeCalculated={setDeliveryInfo} />
          </div>

          <div className="price-breakdown">
            <p>
              <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
            </p>
            <p>
              <strong>Tax: ${tax.toFixed(2)}</strong>
            </p>
            <p>
              <strong>Delivery Fee: ${deliveryInfo?.fee?.toFixed(2)}</strong>
            </p>
            {selectedTip > 0 && (
              <p className="summary-line">
                <strong>Tip: ${selectedTip.toFixed(2)}</strong>
              </p>
            )}
            <h2>
              <strong>Total: ${total.toFixed(2)}</strong>
            </h2>

            <TipSelector subtotal={subtotal} onTipChange={setSelectedTip} />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              isSubmitting || allItems.every((item) => item.quantity === 0)
            }
            className={`submit-button ${isSubmitting ? "disabled" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Procced to Payment"}
          </button>
        </div>
      </div>
      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
    </form>
  );
};

export default Checkout;
