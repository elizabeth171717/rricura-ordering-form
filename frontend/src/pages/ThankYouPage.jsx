import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { pushToDataLayer } from "../analytics/gtmEvents"; // ✅ correct import

const ThankYouPage = () => {
  const location = useLocation();
  const { orderData } = location.state || {}; // ✅ pulls orderData safely

  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderData) {
      // ✅ GTM purchase event
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

    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 6000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate, orderData]); // ✅ include orderData in deps to avoid warning

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
