import { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { pushToDataLayer } from "../analytics/gtmEvents"; // ✅ import the function

const ThankYouPage = () => {
  const location = useLocation();

  // Get orderData from location.state
  const { orderData } = location.state || {};

  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Fire GTM Purchase Event only if orderData is present
    if (orderData) {
      pushToDataLayer("purchase", {
        transaction_id: orderData.orderNumber,
        ecommerce: {
          currency: "USD",
          value: orderData.total,
          tax: orderData.tax,
          shipping: orderData.deliveryAddress?.fee || 0,
          items: orderData.items.map((item) => ({
            item_id: item.id,
            item_name: item.name,
            price: item.basePrice,
            quantity: item.quantity,
          })),
        },
      });

      console.log("✅ GTM Purchase Event pushed:", orderData);
    }

    // Show the thank you message after 1 second
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    // Redirect to homepage after 6 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 6000);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(messageTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const handleManualRedirect = () => {
    navigate("/");
  };

  return (
    <div className="thankyoupage-container">
      {showMessage && (
        <div>
          <h3>Thank you for your order!</h3>
          <p>
            Your payment was successful. Please check your email for order
            details.
          </p>
          <button onClick={handleManualRedirect}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
