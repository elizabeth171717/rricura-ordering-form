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

const Checkout = () => {
  // ✅ Preload Stripe as soon as this page loads
  useEffect(() => {
    stripePromise.then(() => {
      console.log("✅ Stripe.js has started downloading in the background");
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null); // includes fee, address, etc.

  const [showModal, setShowModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  const taxRate = 0.08;
  const navigate = useNavigate();

  // Grab selected items from localStorage
  const selectedTamales = JSON.parse(
    localStorage.getItem("selectedTamales") || "[]"
  );
  const selectedDrinks = JSON.parse(
    localStorage.getItem("selectedDrinks") || "[]"
  );
  const selectedAppetizers = JSON.parse(
    localStorage.getItem("selectedAppetizers") || "[]"
  );
  const selectedSides = JSON.parse(
    localStorage.getItem("selectedSides") || "[]"
  );

  const allItems = [
    ...selectedTamales,
    ...selectedDrinks,
    ...selectedAppetizers,
    ...selectedSides,
  ];

  // Calculate subtotal
  const storedSubtotal = parseFloat(localStorage.getItem("menuSubtotal") || 0);
  const discount = parseFloat(localStorage.getItem("menuDiscount") || 0);
  const promoCode = localStorage.getItem("promoCode") || "";
  const discountedSubtotal = storedSubtotal - discount;

  // Calculate tax and total

  const tax = discountedSubtotal * taxRate;

  const safeTip = isNaN(selectedTip) ? 0 : selectedTip;

  const total =
    discountedSubtotal +
    tax +
    (discountedSubtotal > 0 ? safeTip : 0) +
    (deliveryInfo?.fee || 0);

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
      subtotal: discountedSubtotal, // 👈 rename key here
      tax,
      discountAmount: discount, // ✅
      appliedPromoCode: promoCode, // ✅
      tip: selectedTip || 0, // default to 0 if none selected
      total,
      customerName,
      customerEmail,
      customerPhone,
      deliveryDate: selectedDate.toDateString(),
      deliveryTime: selectedTime,
      deliveryAddress: deliveryInfo, // ✅ Correct and clean
    };

    navigate("/payment-page", {
      state: { orderData },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <Navigation />
      <span onClick={() => navigate(-1)} className="back-button">
        ⬅ Back to Menu
      </span>

      <h2>CHECK OUT</h2>

      <div className="form-container">
        <div className="left">
          <div className="selected-items">
            <h2>Order Summary 🤤</h2>
            {allItems.map((item, i) => (
              <p key={i}>
                {item.quantity} {item.size || item.unit || "x"} {item.name} – $
                {(item.basePrice * item.quantity).toFixed(2)}
              </p>
            ))}

            {/* Show original subtotal */}
            <h3>Subtotal: ${storedSubtotal.toFixed(2)}</h3>

            {discount > 0 && promoCode && (
              <>
                <h3 style={{ color: "green" }}>
                  Promo discount applied: -${discount.toFixed(2)} ({promoCode})
                </h3>

                <h2>
                  <strong>
                    Total after discount: $
                    {(storedSubtotal - discount).toFixed(2)}
                  </strong>
                </h2>
              </>
            )}
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
              <strong>Subtotal: ${discountedSubtotal.toFixed(2)}</strong>
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

            <TipSelector
              subtotal={discountedSubtotal}
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
              isSubmitting || allItems.every((item) => item.quantity === 0)
            }
            className={`submit-button ${isSubmitting ? "disabled" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Procced to Payment"}
          </button>
        </div>
      </div>
      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      {showTerms && <Terms onClose={() => setShowTerms(false)} />}

      <Footer />
    </form>
  );
};

export default Checkout;
