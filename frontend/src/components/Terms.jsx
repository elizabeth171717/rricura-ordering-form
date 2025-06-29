// src/pages/Terms.jsx
import React from "react";

export default function Terms({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="terms-container">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

          <p className="mb-4">Effective Date: [06/01/2025]</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              1. Order Notice & Confirmation
            </h2>
            <p>
              All orders must be placed{" "}
              <strong>at least 2 days in advance</strong>. Your order is not
              confirmed until{" "}
              <strong>payment has been submitted in full</strong>. We reserve
              the right to decline or cancel any unpaid orders.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              2. Menu & Availability
            </h2>
            <p>
              All menu items are subject to availability. We reserve the right
              to make substitutions or adjustments based on ingredient supply
              and seasonality. If a substitution is required, we will attempt to
              contact you for approval.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              3. Cancellation & Rescheduling Policy
            </h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Full Refund:</strong> Cancellations made{" "}
                <strong>48+ hours before delivery</strong> will receive a full
                refund.
              </li>
              <li>
                <strong>No Refund, Rescheduling Only:</strong> Cancellations
                made between <strong>48–24 hours</strong> before delivery are
                non-refundable but can be rescheduled.
              </li>
              <li>
                <strong>No Refund or Rescheduling:</strong> Cancellations made{" "}
                <strong>less than 24 hours</strong> before delivery are final.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. Payment Terms</h2>
            <p>
              Orders must be paid in full at the time of booking. We accept [
              Visa, Mastercard, American Express, Discover, and JCB]. Unpaid
              orders will not be prepared or delivered.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. Delivery Policy</h2>
            <p>
              We deliver from <strong>Brookhaven, GA 30329</strong>. Delivery
              fees may apply based on distance.
            </p>
            <ul className="list-disc pl-6">
              <li>
                If the driver{" "}
                <strong>fails to deliver on time and doesn’t notify you</strong>
                , a <strong>full refund</strong> will be issued.
              </li>
              <li>
                If there is a delay due to traffic or accidents, and we{" "}
                <strong>notify you in advance</strong>, payment is still
                required.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              6. Ingredient Information & Allergies
            </h2>
            <p>
              Ingredients for tamales are listed on our site or available upon
              request. It is the customer’s responsibility to review this
              information.
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>We are not liable</strong> for allergic reactions if
                ingredients were provided.
              </li>
              <li>
                <strong>We are not liable</strong> for side effects caused by
                mislabeled expiration dates by ingredient manufacturers.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              7. Customer Responsibilities
            </h2>
            <p>
              You must provide accurate contact and delivery details. Someone
              must be present to receive the order at the agreed time. Missed
              deliveries due to incorrect information may result in forfeiture.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              8. Limitation of Liability
            </h2>
            <p>
              Once food has been delivered or picked up, we are not liable for
              improper handling or spoilage. We are also not liable for delays
              due to external factors if contact is made in advance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Georgia.
              Disputes will be resolved in the courts of [Dekalb County].
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p>Questions? Reach out to us:</p>
            <p>Email: [rricura828@gmail.com]</p>
            <p>Phone: [7708962564]</p>
            <p>Rricura Tamales & More – Brookhaven, GA</p>
          </section>
          <button onClick={onClose}>Exit</button>
        </div>
      </div>
    </div>
  );
}
