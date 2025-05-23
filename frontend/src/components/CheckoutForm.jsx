import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

console.log("📦 Backend URL:", BACKEND_URL);

const client = import.meta.env.VITE_CLIENT;
console.log("🏷️ Client tenant:", client); // should say "rricura"

const CheckoutForm = ({ orderData, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/thank-you",
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await axios.post(`${BACKEND_URL}/api/${client}/payment`, {
          paymentIntentId: paymentIntent.id,
          orderData,
        });
        localStorage.removeItem("cartItems");

        navigate("/thank-you", { state: { orderData } });
      } catch (error) {
        console.error("Error submitting order:", error);
        setMessage("Payment succeeded, but order failed. Please contact us.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {message && <div className="text-red-600">{message}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
