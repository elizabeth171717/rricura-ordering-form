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
    const transactionId = orderData.orderNumber;

    // Prevent the same purchase from being tracked twice
    const purchaseTracked = sessionStorage.getItem(
      `purchase_tracked_${transactionId}`
    );

    if (!purchaseTracked) {
      pushToDataLayer("purchase", {
        event: "purchase",
        transaction_id: transactionId,
                 ecommerce: {
  currency: "USD",
  value: orderData.total,
  delivery_fee: orderData.deliveryFee,
  tip: orderData.tip,
  tax: orderData.tax,
  shipping: orderData.deliveryFee || 0,
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
      });

      // Remember that this transaction was already tracked
      sessionStorage.setItem(
        `purchase_tracked_${transactionId}`,
        "true"
      );

      console.log("✅ GTM Purchase Event pushed:", orderData);
    } else {
      console.log(
        "⚠️ Purchase already tracked:",
        transactionId
      );
    }
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
}, [navigate, orderData]);


  const handleManualRedirect = () => {
    navigate("/");
  };

  return (
    <div className="thankyoupage-container">
      {showMessage && (
        <div>
          <h3>Thank you for your order!</h3>
          <p>Check your email for order details.</p>
          <button onClick={handleManualRedirect}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ThankYouPage;
