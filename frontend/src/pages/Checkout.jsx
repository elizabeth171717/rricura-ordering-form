import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stripePromise } from "../stripe";
import DeliveryDateComponent from "../components/DeliveryDate";
import DeliveryTimeComponent from "../components/DeliveryTime";
import CostumerInfo from "../components/CostumerInfo";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import DeliveryForm from "../components/DeliveryAddress";
import Terms from "../components/Terms";
import TipSelector from "../components/TipSelector";
import SuccessModal from "../components/SuccessModal";
import { pushToDataLayer } from "../analytics/gtmEvents";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [storedSubtotal, setStoredSubtotal] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTip, setSelectedTip] = useState(0);

  const taxRate = 0.08;

  // Load Stripe on mount
  useEffect(() => {
    stripePromise.then(() => {
      console.log("✅ Stripe.js has started downloading in the background");
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🛒 Load cart items and calculate subtotal
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("tamaleCart")) || [];
    setCartItems(savedCart);
    const subtotal = savedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setStoredSubtotal(subtotal);
  }, []);

  const tax = storedSubtotal * taxRate;
  const deliveryFee = deliveryInfo?.fee || 0;
  const total = storedSubtotal + tax + deliveryFee + (selectedTip || 0);

  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const randomString = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    return `TML-${timestamp}-${randomString}`;
  };

  const handleSubmit = async (e) => {
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

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderNumber = generateOrderNumber();
    setIsSubmitting(true);

    const orderData = {
      orderNumber,
      items: cartItems,
      subtotal: storedSubtotal,
      tax,
      tip: selectedTip || 0,
      deliveryFee,
      total,
      customerName,
      customerEmail,
      customerPhone,
      deliveryDate: selectedDate.toDateString(),
      deliveryTime: selectedTime,
      deliveryAddress: deliveryInfo,
    };

    // GTM event
    pushToDataLayer("begin_checkout", {
      ecommerce: {
        currency: "USD",
        value: total,
        items: cartItems.map((item) => ({
          item_name: item.filling,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });

    navigate("/payment-page", { state: { orderData } });
  };

  const getItemDescription = (item) => {
    // If it's a tamale with filling
    if (item.filling) {
      let description = `${item.filling} tamale`;
      if (item.wrapper) description += ` - ${item.wrapper}`;
      if (item.sauce && item.sauce !== "None")
        description += ` - ${item.sauce} sauce`;
      if (item.vegOil) description += " - Veggie Oil";
      if (item.fruit) description += " - with Fruit";
      return description;
    }

    // If it's a side, drink, appetizer, etc.
    if (item.name) return item.name;

    // Fallback if neither exists
    return "Custom item";
  };

  return (
    <div className="checkout-page">
      <Navigation />
      <form onSubmit={handleSubmit} className="checkout-form">
        <span onClick={() => navigate(-1)} className="back-button">
          ⬅ Back to Menu
        </span>

        <h2>CHECK OUT</h2>

        <div className="form-container">
          <div className="left">
            <div className="selected-items">
              <h2>Order Summary 🤤</h2>
              {cartItems.map((item, i) => (
                <p key={i}>
                  {item.quantity} {getItemDescription(item)} – $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              ))}
              <h2>Subtotal: ${storedSubtotal.toFixed(2)}</h2>
            </div>

            <CostumerInfo
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerEmail={customerEmail}
              setCustomerEmail={setCustomerEmail}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
            />
          </div>

          <div className="right">
            <DeliveryDateComponent onDateSelect={setSelectedDate} />
            <DeliveryTimeComponent
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
            />
            <DeliveryForm onFeeCalculated={setDeliveryInfo} />

            <div className="price-breakdown">
              <p>
                <strong>Subtotal: ${storedSubtotal.toFixed(2)}</strong>
              </p>
              <p>
                <strong>Tax: ${tax.toFixed(2)}</strong>
              </p>
              <p>
                <strong>Delivery Fee: ${deliveryFee.toFixed(2)}</strong>
              </p>
              {selectedTip > 0 && (
                <p>
                  <strong>Tip: ${selectedTip.toFixed(2)}</strong>
                </p>
              )}
              <h2>
                <strong>Total: ${total.toFixed(2)}</strong>
              </h2>

              <TipSelector
                subtotal={storedSubtotal}
                onTipChange={setSelectedTip}
              />
            </div>

            <div>
              <label>
                <input type="checkbox" required /> I have read and agree to the{" "}
                <span
                  onClick={() => setShowTerms(true)}
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  Terms & Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting || cartItems.every((item) => item.quantity === 0)
              }
              className={`submit-button ${isSubmitting ? "disabled" : ""}`}
            >
              {isSubmitting ? "Submitting..." : "Proceed to Payment"}
            </button>
          </div>
        </div>

        {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
        {showTerms && <Terms onClose={() => setShowTerms(false)} />}
      </form>
      <Footer />
    </div>
  );
};

export default Checkout;
