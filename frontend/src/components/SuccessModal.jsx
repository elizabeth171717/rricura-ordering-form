import { useEffect } from "react";
import PropTypes from "prop-types";

const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Thank You!</h2>
        <p className="modal-message">
          Thank you for Choosing us, We have received your order!!!
        </p>
        <button className="modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
