import React, { useState, useEffect, useContext } from "react";
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
import { CartContext } from "../Cartcontext/CartContext";
// Cart Context

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, discount, finalCartTotal, coupon, setCoupon } =
    useContext(CartContext);
  const [couponInput, setCouponInput] = useState("");

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
  const [couponError, setCouponError] = useState("");

  const taxRate = 0.08;

  useEffect(() => {
    stripePromise.then(() => {
      console.log("✅ Stripe.js has started downloading in the background");
    });
    window.scrollTo(0, 0);
  }, []);

  const tax = finalCartTotal * taxRate;
  const deliveryFee = deliveryInfo?.fee || 0;
  const total = finalCartTotal + tax + deliveryFee + (selectedTip || 0);

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

    console.log("CHECKOUT deliveryInfo:", deliveryInfo);

    const orderData = {
      orderNumber,
      items: cartItems,
      subtotal: finalCartTotal,
      discount, // amount discounted
      coupon,
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

    // ✅ GA4 begin_checkout
    pushToDataLayer("begin_checkout", {
      event: "begin_checkout",
      ecommerce: {
        currency: "USD",
        value: total, // total order value (quantity × basePrice)
        items: cartItems.map((item) => ({
          item_name: item.name || item.filling, // ✅ same naming as add_to_cart
          item_category: item.type, // ✅ same
          price: item.price, // ✅ already your calculated order price
          quantity: item.quantity, // ✅ same
        })),
      },
    });

    // ✅ GA4 add_payment_info (right before sending them to Stripe)
    pushToDataLayer("add_payment_info", {
      event: "add_payment_info",
      ecommerce: {
        currency: "USD",
        value: total,
        payment_type: "Stripe Card", // 👈 You can hardcode or make dynamic if you add PayPal, etc.
        items: cartItems.map((item) => ({
          item_id: item.id,
          item_name: item.name || item.filling,
          item_category: item.type,
          price: item.price,
          quantity: item.quantity,
          wrapper: item.wrapper || undefined,
          sauce: item.sauce || undefined,
          size: item.size || undefined,
        })),
      },
    });

    navigate("/payment-page", { state: { orderData } });
  };

  const getItemDescription = (item) => {
    if (item.filling) {
      let description = `${item.filling} tamale`;
      if (item.wrapper) description += ` - ${item.wrapper}`;
      if (item.sauce && item.sauce !== "None")
        description += ` - ${item.sauce} sauce`;
      if (item.vegOil) description += " - Veggie Oil";
      if (item.fruit) description += " - with Fruit";
      return description;
    }
    if (item.name) return item.name;
    return "Custom item";
  };

  const handleFeeCalculated = (info) => {
    setDeliveryInfo(info);

    if (info) {
      // ✅ GA4 add_shipping_info
      pushToDataLayer("add_shipping_info", {
        event: "add_shipping_info",
        ecommerce: {
          currency: "USD",
          value: cartTotal + info.fee, // subtotal + delivery fee
          shipping_tier:
            info.fee === 5 ? "Standard (0-7 miles)" : "Extended (7-12 miles)",
          items: cartItems.map((item) => ({
            item_id: item.id,
            item_name: item.name || item.filling,
            item_category: item.type,
            price: item.price,
            quantity: item.quantity,
            wrapper: item.wrapper || undefined,
            sauce: item.sauce || undefined,
            size: item.size || undefined,
          })),
        },
      });
    }
  };

  const applyCoupon = () => {
    if (couponInput === "FIRST10") {
      setCoupon("FIRST10");
      setCouponError(""); // clear error if valid
    } else {
      setCoupon(null);
      setCouponError("Invalid code 😢");

      // Auto-clear after 3 seconds
      setTimeout(() => setCouponError(""), 3000);
    }
  };

  return (
    <div className="checkout-page">
      <Navigation />
      <form onSubmit={handleSubmit} className="checkout-form">
        <span onClick={() => navigate(-1)} className="back-button">
          ⬅ Back
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
              <h2>Subtotal: ${cartTotal.toFixed(2)}</h2>

              {/* ✅ Promo Code Section */}

              {/* ✅ Promo Code Section */}
              <div className="promo-code">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="button" onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              {/* ✅ Discount message if valid */}
              {discount > 0 && (
                <p className="discount-msg" style={{ color: "green" }}>
                  Discount: -${discount.toFixed(2)}
                </p>
              )}

              {/* ✅ Discounted subtotal if coupon applied */}
              {coupon === "FIRST10" && discount > 0 && (
                <h2>Discounted Subtotal: ${finalCartTotal.toFixed(2)}</h2>
              )}

              {/* ✅ Error message if invalid */}
              {couponError && (
                <p className="error-msg" style={{ color: "red" }}>
                  {couponError}
                </p>
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
            <DeliveryDateComponent onDateSelect={setSelectedDate} />
            <DeliveryTimeComponent
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
            />
            <DeliveryForm onFeeCalculated={handleFeeCalculated} />

            <div className="price-breakdown">
              <p>
                <strong>Subtotal: ${finalCartTotal.toFixed(2)}</strong>
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
                subtotal={finalCartTotal}
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
