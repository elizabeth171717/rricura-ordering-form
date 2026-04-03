import React from "react";
import Navigation from "../Navbar/Navigation";
import Footer from "../Footer/Footer";
import "./Wholesale.css"
const Wholesale = () => {
  return (
    <div  className="page-container">
        <Navigation/>
      <div className="wholesale-container">
      {/* HEADER */}
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Wholesale Tamales for Restaurants & Businesses
      </h1>

      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Offer authentic, homemade tamales at your business without extra kitchen work.
      </p>
<div className="wholesale-steps">
      {/* WHY SECTION */}
      <div className="whosale-details">
      <div style={{ marginBottom: "30px" }}>
        <h3>Why Partner With Us?</h3>
        <ul>
          <li>✔ Fully prepared – no prep required</li>
          <li>✔ Consistent quality and flavor</li>
          <li>✔ Made fresh to order</li>
          <li>✔ Easy to reheat and serve</li>
          <li>✔ Perfect for breweries, cafes, and restaurants</li>
        </ul>
      </div>

      {/* PRODUCT SECTION */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Our Tamales</h3>
        <p>
          We offer a variety of traditional and specialty tamales on Banana Leaf & Corn Husk, including:
        </p>
        <ul>
          <li>✔ Chicken Tamales</li>
          <li>✔ Pork Tamales</li>
          <li>✔ Rajas (Cheese & Pepper)</li>
          <li>✔ Sweet Tamales</li>
          <li>✔ Pinto Tamales (Black Bean)</li>
          <li>✔ Chipilin Tamales</li>
        </ul>
        <p>
          All tamales are made in batches and available for weekly supply.
        </p>
      </div>

     
</div>
      {/* CTA SECTION */}
      <div
        className="CTA"
      >
         {/* HOW IT WORKS */}
      <div style={{ marginBottom: "30px" }}>
        <h3>How It Works</h3>
        <ol>
          <li>Request a sample</li>
          <li>Choose your flavors and quantity</li>
          <li>We prepare and deliver your order</li>
          <li>You heat, serve, and sell</li>
        </ol>
      </div>
        <h2  style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "12px 20px",
            backgroundColor: "#9D0759",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold"
          }}>Request a Free Sample</h2>
        <p>
         We’d love to bring you a sample so you can try our tamales—no commitment required
        </p>
          <p style={{
            marin:"30px",
        color:"#9D0759"
          }}>Email Us at:  <a
          href="mailto:rricura828@gmail.com"  style={{
            
            textDecoration: "underline",
            
            fontWeight: "bold"
          }}>rricura828@gmail.com</a> We typically respond within 24 hours.</p>

         <div style={{ margin: "30px" }}>
        <h3>Please include:</h3>
        <ul>
          <li>✔ Your name</li>
          <li>✔ Business name</li>
          <li>✔ Location</li>
          <li>✔ Preferred date & time to meet</li>
          <li>✔ Which tamales you’re interested in offering</li>
        </ul>
      </div>
      

      {/* CONTACT */}
     
       
      
         <p><strong>Rricura Tamales Mexicanos</strong></p>
        <p>Brookhaven, GA</p>
      </div>
      </div>
</div>
<Footer/>
    </div>
  );
};

export default Wholesale;