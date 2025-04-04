import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const DeliveryDateComponent = ({ onDateSelect }) => {
  // Set the minimum delivery date (2 days from today)
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 2);

  const [selectedDate, setSelectedDate] = useState(null);

  // Disable Sundays (day index 0)
  const isSunday = (date) => date.getDay() === 0;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <div>
      <h3>Select Delivery Date:</h3>
      <p>We require a 2 days advance notice in all order, close sundays.</p>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={minDate}
        filterDate={(date) => !isSunday(date)}
        dateFormat="MMMM d, yyyy"
        placeholderText="Choose a date"
        className="custom-datepicker"
      />
    </div>
  );
};

DeliveryDateComponent.propTypes = {
  onDateSelect: PropTypes.func.isRequired,
};

export default DeliveryDateComponent;
