require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(customerEmail, customerName, orderData) {
  console.log("📨 Sending email to:", customerEmail);
  try {
    // Format order details for email
    const { quantity, tamale, sourCream = 0, salsaVerde = 0, subtotal, tax, deliveryFee, total, deliveryDate, deliveryTime, deliveryAddress } = orderData;
    
    const orderSummary = `
    Hi ${customerName},

    We have received your order and are preparing it. Here are your order details:

    🔹 Order Summary:
    -Quantity:${quantity} tamales.
    - Tamales: ${tamale} 
    - Sour Cream: $${sourCream.toFixed(2)}
    - Salsa Verde: $${salsaVerde.toFixed(2)}
    - Subtotal: $${subtotal.toFixed(2)}
    - Tax: $${tax.toFixed(2)}
    - Delivery Fee: $${deliveryFee.toFixed(2)}
    - Total: $${total.toFixed(2)}

    📦 Your order will be delivered on:
    📅 Date: ${deliveryDate}
    ⏰ Time: ${deliveryTime}
    📍 Delivery Address: ${deliveryAddress?.street || "N/A"}, ${deliveryAddress?.city || "N/A"}, ${deliveryAddress?.state || "N/A"} ${deliveryAddress?.zip || "N/A"}

    We will contact you when the driver is on the way.
    Thank you for ordering from Rricura Tamales Mexicanos!

    
    Rricura Tamales Mexicanos
    `;

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Your Tamale Order Confirmation',
      text: orderSummary
    };

    await transporter.sendMail(customerMailOptions);
    console.log("✅ Receipt email sent to customer:", customerEmail);

    // 🔥 DEBUG: Check if OWNER_EMAIL exists
    if (!process.env.OWNER_EMAIL) {
      console.error("❌ OWNER_EMAIL is missing in .env file!");
      return;
    }

    console.log("📨 Preparing notification email to owner:", process.env.OWNER_EMAIL);

    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL, 
      subject: 'New Order Received!',
      text: `🚀 New customer order received!\n\nName: ${customerName}\nEmail: ${customerEmail}\nOrder Details:\n${JSON.stringify(orderData, null, 2)}`
    };

    await transporter.sendMail(ownerMailOptions);
    console.log("✅ Notification email sent to OWNER!");

  } catch (error) {
    console.error('❌ Error sending emails:', error);
  }
}

module.exports = sendEmail;
