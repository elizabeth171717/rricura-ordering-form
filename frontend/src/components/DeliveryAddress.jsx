import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

console.log("📦 Backend URL:", BACKEND_URL);
const client = import.meta.env.VITE_CLIENT;

console.log("🏷️ Client tenant:", client); // should say "rricura"

export default function DeliveryForm({ onFeeCalculated }) {
  const [form, setForm] = useState({
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    instructions: "",
  });

  const [deliveryFee, setDeliveryFee] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        const { street, city, state, zip } = updatedForm;

        const isCompleteAddress =
          street.trim().length > 5 &&
          city.trim().length > 1 &&
          state.trim().length === 2 &&
          zip.trim().length === 5;

        if (isCompleteAddress) {
          console.log(
            "📫 Sending full address:",
            `${street}, ${city}, ${state} ${zip}`
          );
          getDeliveryFee(updatedForm); // ✅ Only now
        } else {
          console.log("⏳ Waiting for complete address...");
        }
      }, 1000)
    );
  };

  const getDeliveryFee = async (updatedForm) => {
    const fullAddress = `${updatedForm.street} ${updatedForm.apt}, ${updatedForm.city}, ${updatedForm.state} ${updatedForm.zip}`;
    console.log("📫 Full Address to send:", fullAddress);
    if (
      !updatedForm.street ||
      !updatedForm.city ||
      !updatedForm.state ||
      !updatedForm.zip
    )
      return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/${client}/delivery-fee`,
        {
          address: fullAddress,
        }
      );

      const info = {
        fee: res.data.fee,
        distanceMiles: res.data.distanceMiles,
        fullAddress,
        instructions: updatedForm.instructions,
        street: updatedForm.street,
        city: updatedForm.city,
        state: updatedForm.state,
        zip: updatedForm.zip,
      };

      setDeliveryFee(info);

      if (onFeeCalculated) onFeeCalculated(info);
    } catch (err) {
      console.error("❌ Failed to fetch delivery fee", err);
      setDeliveryFee(null);

      // Show specific message if out of range
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.error
      ) {
        setErrorMessage(err.response.data.error); // 👈 Show this instead of alert
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 👈 hides after 5 seconds

      if (onFeeCalculated) onFeeCalculated(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h3>Enter Your Delivery Address</h3>

      <input
        name="street"
        placeholder="Street address"
        value={form.street}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="apt"
        placeholder="Apt / Unit (optional)"
        value={form.apt}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="state"
        placeholder="State (e.g. GA)"
        value={form.state}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="zip"
        placeholder="Zip Code"
        value={form.zip}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="instructions"
        placeholder="Delivery instructions (optional)"
        value={form.instructions}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={3}
      />

      {isLoading && (
        <p className="text-sm text-gray-600">Calculating delivery fee...</p>
      )}

      {deliveryFee && (
        <div className="bg-green-100 p-3 rounded mt-2">
          <p>
            <strong>Delivery Fee:</strong> ${deliveryFee.fee}
          </p>
        </div>
      )}
      {!isLoading && errorMessage && (
        <div className="bg-red-100 text-red-800 p-3 rounded mt-2">
          <strong>{errorMessage}</strong>
        </div>
      )}
    </div>
  );
}
