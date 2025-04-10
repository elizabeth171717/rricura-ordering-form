// components/LoadingOverlay.jsx
import React from "react";

const LoadingOverlay = ({ message = "Preparing payment form..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loader mb-4"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingOverlay;
