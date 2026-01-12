import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navigation from "../components/Navbar/Navigation";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

console.log("📦 Backend URL:", BACKEND_URL);
const client = import.meta.env.VITE_CLIENT;
console.log("🏷️ Client tenant:", client); // should say "rricura"
console.log(
  "📬 Final POST URL:",
  `${BACKEND_URL}/api/${client}/create-payment-intent`
);
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderData } = location.state || {};
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (orderData?.total && orderData?.customerEmail) {
      axios
        .post(`${BACKEND_URL}/api/${client}/create-payment-intent`, {
          total: orderData.total,
          customerEmail: orderData.customerEmail,
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) =>
          console.error("Error getting Stripe clientSecret:", err)
        );
    }
  }, [orderData]);

  if (!orderData)
    return <div>Invalid order. Please go back and try again.</div>;
  if (!clientSecret) {
    return (
      <div className="paymentPage-container">
        <Navigation />
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Proceeding to payment…
        </p>
      </div>
    );
  }

  return (
    <div className="paymentPage-container">
      <Navigation />
      <span onClick={() => navigate(-1)} className="back-button">
        ⬅ Back
      </span>
      <h2 className="page-title">PAYMENT PAGE</h2>
      <div className="payment-wrapper">
        {/* 🔥 Display the total to be paid */}
        <div className="total">
          You're paying{" "}
          <span className="font-semibold">${orderData.total.toFixed(2)}</span>{" "}
          for your order.
        </div>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm orderData={orderData} navigate={navigate} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
