import { useState, useContext } from "react";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { CartContext } from "../Cartcontext/CartContext";
import { pushToDataLayer } from "../analytics/gtmEvents";
console.log("📦 Backend URL:", BACKEND_URL);

const client = import.meta.env.VITE_CLIENT;
console.log("🏷️ Client tenant:", client); // should say "rricura"

const CheckoutForm = ({ orderData, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { clearCart } = useContext(CartContext); // ⬅️ now you have clearCart

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");



  // =========================================================
  // GA4 payment_attempt
  // Customer actually clicked "Pay Now"
  // =========================================================
  pushToDataLayer("payment_attempt", {
    event: "payment_attempt",
    ecommerce: {
      currency: "USD",
      value: orderData.total,
      items: orderData.items.map((item) => ({
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
    payment_type: "Stripe Card",
  });

  console.log("💳 GA4 payment_attempt:", orderData);



    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/thank-you",
      },
      redirect: "if_required",
    });

// =========================================================
  // GA4 payment_failed
  // Stripe rejected/failed the payment
  // =========================================================
  if (error) {
    pushToDataLayer("payment_failed", {
      event: "payment_failed",
      ecommerce: {
        currency: "USD",
        value: orderData.total,
        items: orderData.items.map((item) => ({
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
      payment_type: "Stripe Card",
      error_type: error.type,
      error_code: error.code || undefined,
    });

    console.log("❌ GA4 payment_failed:", {
      message: error.message,
      type: error.type,
      code: error.code,
    });

    setMessage(error.message);
    setLoading(false);

  
    
} else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await axios.post(`${BACKEND_URL}/api/${client}/payment`, {
          paymentIntentId: paymentIntent.id,
          orderData,
        });

        clearCart();

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
