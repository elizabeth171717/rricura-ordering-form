import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import Navigation from "../Navbar/Navigation";
import Footer from "../Footer/Footer";

import { BACKEND_URL } from "../../constants/constants";

import { CartContext } from "../../Cartcontext/CartContext";

import "./MondayTamaleSpecial.css";

const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "rricura-tamales";

const CURRENT_VIEW = "monday-special";

function MondayTamaleSpecial() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [quantities, setQuantities] = useState({});

  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useContext(CartContext);

  const isMonday = new Date().getDay() === 1;

  // =============================
  // LOAD MONDAY SPECIAL ITEMS
  // =============================
  useEffect(() => {
    const fetchMondaySpecials = async () => {
      try {
        // ✅ FETCH MENU
        const menuRes = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`
        );

        const menuData = await menuRes.json();

        if (!menuData.sections) {
          setItems([]);
          return;
        }
const combinedItems =
  menuData.sections.flatMap((section) => [
    ...(section.items || []),

    ...(section.groups || []).flatMap(
      (group) => group.items || []
    ),
  ]);

console.log("MONDAY ITEMS:", combinedItems);

setItems(combinedItems);

      } catch (err) {
        console.error(
          "Failed to fetch Monday specials:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMondaySpecials();
  }, []);

  // =============================
  // QUANTITY CONTROLS
  // =============================


const increaseQty = (id, maxRemaining) => {
  setQuantities((prev) => {
    const current = prev[id] || 1;

    // 🚫 stop at remaining stock
    if (
      maxRemaining !== null &&
      current >= maxRemaining
    ) {
      return prev;
    }

    return {
      ...prev,
      [id]: current + 1,
    };
  });
};


  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  // =============================
  // ADD TO CART
  // =============================
  const handleAddToCart = (item) => {
    const settings =
      item.displaySettings?.[CURRENT_VIEW];

    if (!isMonday) {
      alert(
        "Monday special is only available on Mondays"
      );

      return;
    }

   
    const id = item.id;

    const qty = quantities[id] || 1;

    const newItem = {
      type: "tamale",

      name: item.name,

      img: item.image,

       price:
    item.prices?.[CURRENT_VIEW] ??
    item.basePrice ??
    0,


      quantity: qty,

      customProperties:
        item.customProperties || [],
    };

    if (
  settings.remaining !== null &&
  qty > settings.remaining
) {
  alert(
    `Only ${settings.remaining} available`
  );

  return;
}
    const success = addToCart({
      ...newItem,
      orderType: "monday",
    });

    if (!success) {
      alert(
        "Orders must be placed separately."
      );

      return;
    }

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2500);

    setQuantities((prev) => ({
      ...prev,
      [id]: 1,
    }));
  };

  // =============================
  // LOADING
  // =============================
  if (loading) {
    return (
      <p style={{ textAlign: "center" }}>
        Loading menu...
      </p>
    );
  }

  // =============================
  // UI
  // =============================
  return (
    <div className="monday-container">
      <Navigation />

      <div className="title-container">
        <h2>
          🫔 MONDAY TAMALE SPECIAL
        </h2>

        <p>
          Every Monday we’re serving tamales
          by the piece, with a different
          filling each week to keep things
          exciting.
        </p>
      </div>

      <div className="monday-menu-grid">
        {items.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            No items available today
          </p>
        ) : (
          items.map((item) => {
            const id = item.id;

            const qty =
              quantities[id] || 1;

            // ✅ CURRENT VIEW SETTINGS
            const settings =
              item.displaySettings?.[
                CURRENT_VIEW
              ] || {
                visible: true,
                available: true,
                remaining: null,
              };
if (!settings.visible) {
  return null;
}

            return (
              <div
                key={id}
                className="menu-card"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                )}

                <p>{item.name}</p>

                {item.description && (
                  <p>{item.description}</p>
                )}

                <p>
  $
  {item.prices?.[CURRENT_VIEW] ??
    item.basePrice ??
    0}
</p>
                {/* LOW STOCK */}
                {settings.remaining !== null &&
                  settings.remaining > 0 &&
                  settings.remaining <= 5 && (
                    <p
                      style={{
                        color: "orange",
                        fontWeight: "bold",
                      }}
                    >
                      ⚠️ Only{" "}
                      {settings.remaining} left
                    </p>
                  )}

                {/* SOLD OUT */}
                {settings.remaining === 0 && (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    ❌ Sold Out
                  </p>
                )}

                {/* UNAVAILABLE */}
                {!settings.available && (
                  <p>
                    ❌ Unavailable
                  </p>
                )}

                {/* AVAILABLE */}
                {settings.available && (
                  <>
                    <div className="qty-counter">
                      <button
                        onClick={() =>
                          decreaseQty(id)
                        }
                      >
                        -
                      </button>

                      <span>{qty}</span>

                      <button
                        onClick={() =>
  increaseQty(id, settings.remaining)
}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        handleAddToCart(item)
                      }
                      disabled={!isMonday}
                    >
                      {isMonday
                        ? "Add to Cart"
                        : "Available Monday Only"}
                    </button>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      <Footer />

      {/* POPUP */}
      {showPopup && (
        <div className="cart-popup">
          ✅ Added to cart!
        </div>
      )}
    </div>
  );
}

export default MondayTamaleSpecial;