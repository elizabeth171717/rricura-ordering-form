import PropTypes from "prop-types";

const DeliveryTimeComponent = ({ selectedTime, onTimeSelect }) => {
  // Generate available time slots from 8:00 AM to 9:00 PM
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 8; hour <= 21; hour++) {
      const amPm = hour < 12 ? "AM" : "PM";
      const formattedHour = hour > 12 ? hour - 12 : hour;
      times.push(`${formattedHour}:00 ${amPm}`);
    }
    return times;
  };

  return (
    <div className="delivery-time">
      <h3>Select Delivery Time:</h3>
      <select
        value={selectedTime}
        onChange={(e) => onTimeSelect(e.target.value)}
      >
        <option value="">Choose a time</option>
        {generateTimeSlots().map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

// PropTypes validation
DeliveryTimeComponent.propTypes = {
  selectedTime: PropTypes.string.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};

export default DeliveryTimeComponent;
