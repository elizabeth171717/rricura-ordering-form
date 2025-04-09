import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (orderData?.total && orderData?.customerEmail) {
      axios
        .post(`${BACKEND_URL}/api/create-payment-intent`, {
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
  if (!clientSecret) return <div>Loading payment form...</div>;

  return (
    <div className="paymentPage-container">
      <h2>Complete Your Payment</h2>
      {/* 🔥 Display the total to be paid */}
      <div className="total">
        You're paying{" "}
        <span className="font-semibold">${orderData.total.toFixed(2)}</span> for
        your order.
      </div>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm orderData={orderData} navigate={navigate} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
