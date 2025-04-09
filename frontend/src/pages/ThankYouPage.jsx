import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
