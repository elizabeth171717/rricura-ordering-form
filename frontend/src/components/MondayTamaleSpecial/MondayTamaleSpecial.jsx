import React, { useEffect, useState, useContext } from "react";
import Navigation from "../Navbar/Navigation";
import Footer from "../Footer/Footer"
import { BACKEND_URL } from "../../constants/constants";
import { CartContext } from "../../Cartcontext/CartContext";
import "./MondayTamaleSpecial.css";
const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "rricura-tamales";

// ✅ ONLY THESE WILL SHOW
const allowedItems = [

  "Chicken-Red-Corn Husk",
 "Jamaica",
"Champurrado",
"Rajas-Green-Corn Husk",

];

function MondayTamaleSpecial() {
  const [items, setItems] = useState([]); // ✅ IMPORTANT: we use items now
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
const isMonday = new Date().getDay() === 1;
  const { addToCart } = useContext(CartContext);
 const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`
        );

        const data = await res.json();

        if (!data.sections) return;

        // ✅ FLATTEN EVERYTHING
        const combinedItems = data.sections.flatMap((section) => [
          ...(section.items || []),
          ...(section.groups || []).flatMap((g) => g.items || []),
        ]);

        // ✅ FILTER ONLY WHAT YOU WANT
        const filtered = combinedItems.filter((item) =>
          allowedItems.includes(item.name)
        );

        setItems(filtered); // ✅ ONLY THESE WILL RENDER
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleAddToCart = (item) => {
     if (!isMonday) {
    alert("Monday special is only available on Mondays");
    return;
  }


    const id = item._id || item.id;
    const qty = quantities[id] || 1;

    if (qty === 0) return;

    const newItem = {
      type: "tamale",
      name: item.name,
      img: item.image,
      price: item.price,
      quantity: qty,
      customProperties: item.customProperties || [],
    };

    const success = addToCart({
      ...newItem,
      orderType: "monday",
    });

    if (!success) {
      alert("Orders must be placed separately.");
      return;
    }


    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);



    setQuantities((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  }


  return (
    <div className="monday-container">
      <Navigation />
<div className="title-container">
      <h2>🫔 MONDAY TAMALE SPECIAL</h2>
      <p>Every Monday we’re serving tamales by the piece, with a different filling each week to keep things exciting. Pair them with one of our fresh drinks—no minimum order needed. 
        We deliver throughout Brookhaven and nearby areas, as orders come in starting at 8:00am, until we sell out.
      </p>
</div>
      <div className="monday-menu-grid">
      {items.length === 0 ? (
  <p style={{ textAlign: "center", width: "100%" }}>
    No items available today
  </p>
) : (
  items.map((item) => {
    const id = item._id || item.id;
    const qty = quantities[id] || 1;

    return (
      <div key={id} className="menu-card">
        {item.image && <img src={item.image} alt={item.name} />}

        <p>{item.name}</p>
   {/* ✅ LOW STOCK MESSAGE */}
{item.remaining !== undefined && item.remaining > 0 && item.remaining <= 5 && (
  <p style={{ color: "orange", fontWeight: "bold" }}>
    ⚠️ Only {item.remaining} left
  </p>
)}
        {!item.available && <p>❌ Unavailable</p>}

        {item.available && (
          <>
            <div className="qty-counter">
              <button onClick={() => decreaseQty(id)}>-</button>
              <span>{qty}</span>
              <button onClick={() => increaseQty(id)}>+</button>
            </div>

            <button
              onClick={() => handleAddToCart(item)}
              disabled={!isMonday}
            >
              {isMonday ? "Add to Cart" : "Available Monday Only"}
            </button>
          </>
        )}
      </div>
    );
  })
)}
      </div>
      <Footer/>
      {/* Added popup */}
      {showPopup && <div className="cart-popup">✅ Added to cart!</div>}
    </div>
  );
}

export default MondayTamaleSpecial;