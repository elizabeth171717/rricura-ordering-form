import React, { useState, useMemo, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PeopleCount from "./PeopleCount";
import pulledChickenImg from "../assets/pulledchicken.jpg";
import pulledPorkImg from "../assets/pulledpork.jpg";
import chipillinImg from "../assets/chipilin.jpg";
import rajasTamaleImg from "../assets/rajastamale.jpg";
import sweetTamaleImg from "../assets/sweettamale.png";
import bananaLeafImg from "../assets/bananaleaf.jpg";
import cornHuskImg from "../assets/cornhusk.jpg";
import greenSauceImg from "../assets/greensauce.jpeg";
import redSauceImg from "../assets/salsaroja.jpg";
import tomateSauceImg from "../assets/tomatesauce.jpg";
import blackBeanImg from "../assets/blackbean.jpg";
import salsaVerde from "../assets/salsaverde.jpg";
// Cart Context

import { CartContext } from "../Cartcontext/CartContext"; // <- use the context, NOT the provider
import { BACKEND_URL } from "../constants/constants";
const CLIENT_ID = "universalmenu"; // 👈 your restaurant/client ID

const fillings = [
  { name: "Chicken", value: "Chicken", img: pulledChickenImg },
  { name: "Pork", value: "Pork", img: pulledPorkImg },
  {
    name: "Rajas",
    value: "Rajas",
    img: rajasTamaleImg,
  },
  { name: "Chipilin", value: "Chipilin", img: chipillinImg },
  { name: "Black Bean", value: "Black Bean", img: blackBeanImg },
  { name: "Sweet", value: "Sweet", img: sweetTamaleImg },
];

const wrappers = [
  { name: "Corn Husk", value: "Corn Husk", img: cornHuskImg },
  { name: "Banana Leaf", value: "Banana Leaf", img: bananaLeafImg },
];

const sauces = [
  { name: "Green Sauce", value: "Green", img: greenSauceImg },
  { name: "Red Sauce", value: "Red", img: redSauceImg },
  { name: "Tomato Sauce", value: "Tomato", img: tomateSauceImg },
];

const TamaleBuilder = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("basic"); // "basic" or "salsa"
  const [showStickySummary, setShowStickySummary] = useState(true);

  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useContext(CartContext);

  const [totalTamales, setTotalTamales] = useState(null);
  const [filling, setFilling] = useState(null);
  const [wrapper, setWrapper] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [activeStep, setActiveStep] = useState("filling");
  // "filling" | "wrapper" | "sauce" | null

  // ✅ Universal Menu data (replaces tamalePrices)
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Use your existing Universal Menu fetch pattern
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/${CLIENT_ID}/menu`);
        const data = await res.json();
        setMenuData(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tamaleBuilderSelections"));
    if (saved) {
      const fill = fillings.find((f) => f.value === saved.filling);
      const wrap = wrappers.find((w) => w.value === saved.wrapper);
      const sauc = sauces.find((s) => s.value === saved.sauce);
      if (fill) setFilling(fill);
      if (wrap) setWrapper(wrap);
      if (sauc) setSauce(sauc);
      if (typeof saved.totalTamales === "number")
        setTotalTamales(saved.totalTamales);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tamaleBuilderSelections",
      JSON.stringify({
        filling: filling?.value || null,
        wrapper: wrapper?.value || null,
        sauce: sauce?.value || null,
        totalTamales,
      })
    );
  }, [filling, wrapper, sauce, totalTamales]);

  useEffect(() => {
    if (totalTamales === 0) {
      setFilling(null);
      setWrapper(null);
      setSauce(null);
    }
  }, [totalTamales]);

  // 🧮 Calculate selected item based on Universal Menu using customProperties
  const selected = useMemo(() => {
    if (!menuData || !filling) return null;

    // flatten items from sections -> groups -> items (same shape Menu.jsx uses)
    const allItems =
      menuData?.sections?.flatMap((section) =>
        (section.groups || []).flatMap((group) => group.items || [])
      ) || [];

    // helper to get a customProperty value (case-insensitive key)
    const getProp = (item, key) => {
      const arr = item.customProperties || [];
      const found = arr.find(
        (p) =>
          String(p.key).trim().toLowerCase() ===
          String(key).trim().toLowerCase()
      );
      return found?.value;
    };

    const assumedWrapper =
      filling.value === "Sweet" ? "Corn Husk" : wrapper?.value;
    const assumedSauce = ["Sweet", "Chipilin", "Black Bean"].includes(
      filling.value
    )
      ? "None"
      : sauce?.value || "None";

    // find match by comparing the customProperties (Filling, Wrapper, Sauce)
    return allItems.find((item) => {
      if (!item) return false;

      const itemFilling = getProp(item, "Filling") || item.filling;
      const itemWrapper = getProp(item, "Wrapper") || item.wrapper;
      const itemSauce = getProp(item, "Sauce") || item.sauce;

      // normalize to strings for robust comparison
      const norm = (v) =>
        v === undefined || v === null ? "" : String(v).trim();

      const fillA = norm(itemFilling).toLowerCase();
      const fillB = norm(filling.value).toLowerCase();

      // ✅ Fix: allow partial/loose matches (Chipilin vs Chipilín, Black Bean vs Black Beans)
      if (!fillA.includes(fillB) && !fillB.includes(fillA)) return false;

      if (
        norm(itemWrapper).toLowerCase() !== norm(assumedWrapper).toLowerCase()
      )
        return false;

      // treat "None" specially when sauce is absent
      const itemSauceNorm = norm(itemSauce).toLowerCase();
      const assumedSauceNorm = norm(assumedSauce).toLowerCase();
      if (itemSauceNorm !== assumedSauceNorm) return false;

      return true;
    });
  }, [menuData, filling, wrapper, sauce]);

  const subtotal =
    selected?.price && totalTamales
      ? (selected.price * totalTamales).toFixed(2)
      : null;

  const hasAllRequiredSelections = (() => {
    if (!filling) return false;

    switch (filling.value) {
      case "Sweet":
        return true; // auto-ready
      case "Chipilin":
      case "Black Bean":
        return !!wrapper; // only wrapper required
      case "Chicken":
      case "Pork":
      case "Rajas":
        return wrapper && sauce; // both needed
      default:
        return false;
    }
  })();

  const isReady =
    selected &&
    selected.price &&
    hasAllRequiredSelections &&
    totalTamales &&
    totalTamales >= 12;

  const handleAddToCart = () => {
    if (!isReady || !selected) return;

    // Extract clean properties from your builder
    const fillingValue =
      filling?.value ||
      selected.customProperties?.find((p) => p.key.toLowerCase() === "filling")
        ?.value ||
      selected.name;

    const wrapperValue =
      wrapper?.value ||
      selected.customProperties?.find((p) => p.key.toLowerCase() === "wrapper")
        ?.value ||
      "";

    const sauceValue =
      sauce?.value ||
      selected.customProperties?.find((p) => p.key.toLowerCase() === "sauce")
        ?.value ||
      "";

    // ✅ Combine both selected item data and your builder selections
    const newItem = {
      type: "tamale",
      name: selected.name,
      img: selected.image,
      price: selected.price,
      quantity: totalTamales,
      filling: fillingValue,
      wrapper: wrapperValue,
      sauce: sauceValue,
      customProperties: selected.customProperties || [],
    };

    // Add to global cart context
    addToCartContext(newItem);

    // ✅ Popup handling
    if (newItem.filling?.toLowerCase() !== "sweet tamale") {
      setPopupType("salsa");
    } else {
      setPopupType("basic");
    }
    setShowPopup(true);

    setShowStickySummary(false); // 👈 THIS hides it
    // reset builder state
    setFilling(null);
    setWrapper(null);
    setSauce(null);
    setTotalTamales(null);

    // optional: clear saved selections
    localStorage.removeItem("tamaleBuilderSelections");
  };

  const handleKeepShopping = () => {
    setShowStickySummary(false);
    setFilling(null);
    setWrapper(null);
    setSauce(null);
    setTotalTamales(null);
    localStorage.removeItem("tamaleBuilderSelections");
    navigate("/OnlineOrdering");
  };

  useEffect(() => {
    if (isReady) {
      setShowStickySummary(true);
    }
  }, [isReady]);

  // auto-hide popup after 10 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showPopup]);
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  }
  return (
    <div className="step-container">
      <p
        style={{
          color: "#9D0759",
          fontFamily: "revert-layer",
          textAlign: "center",
        }}
      >
        CATERING MENU
      </p>
      <PeopleCount setPeople={setTotalTamales} value={totalTamales} />
      <h2>Build your TAMALE🫔 </h2>
      <div className="selected-summary">
        {filling && (
          <div className="selected-option">
            <h4>Filling</h4>
            <img
              src={filling.img}
              alt={filling.name}
              className="tamale-builder-img"
            />
            <p>{filling.name}</p>
            <button
              onClick={() => {
                setFilling(null);
                setWrapper(null);
                setSauce(null);
              }}
            >
              🖊️ Edit
            </button>
          </div>
        )}
        {wrapper && (
          <div className="selected-option">
            <h4>Wrapper</h4>
            <img
              src={wrapper.img}
              alt={wrapper.name}
              className="tamale-builder-img"
            />
            <p>{wrapper.name}</p>
            <button
              onClick={() => {
                setWrapper(null);
                setSauce(null);
                setActiveStep("wrapper");
              }}
            >
              🖊️ Edit
            </button>
          </div>
        )}
        {sauce && (
          <div className="selected-option">
            <h4>Sauce</h4>
            <img
              src={sauce.img}
              alt={sauce.name}
              className="tamale-builder-img"
            />
            <p>{sauce.name}</p>
            <button onClick={() => setSauce(null)}>🖊️ Edit</button>
          </div>
        )}
      </div>

      {!filling && (
        <>
          <h3 className="option-name">Choose Tamale Filling:</h3>
          <div className="grid">
            {fillings.map((item) => (
              <div
                key={item.value}
                className="option-card"
                onClick={() => {
                  setFilling(item);
                  setActiveStep("wrapper");
                }}
              >
                <img src={item.img} alt={item.name} className="product-img" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeStep === "wrapper" &&
        filling &&
        ["Chicken", "Pork", "Rajas", "Chipilin", "Black Bean"].includes(
          filling.value
        ) && (
          <div className="step-popup">
            <div className="popup-card">
              <h3>Choose Wrapper</h3>

              <div className="grid">
                {wrappers.map((item) => (
                  <div
                    key={item.value}
                    className="option-card"
                    onClick={() => {
                      setWrapper(item);
                      setActiveStep(
                        ["Chicken", "Pork", "Rajas"].includes(filling.value)
                          ? "sauce"
                          : null
                      );
                    }}
                  >
                    <img src={item.img} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {activeStep === "sauce" &&
        filling &&
        wrapper &&
        ["Chicken", "Pork", "Rajas"].includes(filling.value) && (
          <div className="step-popup">
            <div className="popup-card">
              <h3>Choose Sauce</h3>

              <div className="grid">
                {sauces.map((item) => (
                  <div
                    key={item.value}
                    className="option-card"
                    onClick={() => {
                      setSauce(item);
                      setActiveStep(null);
                    }}
                  >
                    <img src={item.img} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {isReady && showStickySummary && (
        <>
          <div className="summary-block">
            <div className="summary-img">
              {selected.image && (
                <img src={selected.image} alt={selected.name || "Preview"} />
              )}
            </div>
            <div className="summary-details">
              <p>
                {(() => {
                  // Helper: safely find a property by key in customProperties
                  const getProp = (key) => {
                    const found = selected?.customProperties?.find(
                      (p) => p.key?.toLowerCase() === key.toLowerCase()
                    );
                    return found?.value || "";
                  };

                  // 🧠 Prefer state values first, fallback to customProperties
                  const fillingValue =
                    filling?.value ||
                    getProp("Filling") ||
                    selected?.name ||
                    "";
                  const wrapperValue =
                    wrapper?.value || getProp("Wrapper") || "corn husk";
                  const sauceValue = sauce?.value || getProp("Sauce") || "";

                  // 🧩 Build readable text
                  let description = `${totalTamales} ${fillingValue} tamales in ${wrapperValue}`;
                  if (sauceValue && sauceValue !== "None") {
                    description += ` with ${sauceValue} sauce`;
                  }

                  return description;
                })()}
              </p>

              <p>Subtotal: ${subtotal}</p>

              <button onClick={handleAddToCart} className="add-btn">
                ADD TO CART
              </button>
              <span onClick={handleKeepShopping} className="keep-shopping-text">
                Keep shopping
              </span>
            </div>
          </div>
        </>
      )}

      {showPopup && (
        <div className="cart-popup">
          <button className="popup-close" onClick={() => setShowPopup(false)}>
            ✕
          </button>
          <div className="popup-content">
            <h3>✅ Added to Cart!</h3>

            {popupType === "salsa" ? (
              <>
                <p>Tamales are even better with salsa. Want to add some?</p>
                <img
                  src={salsaVerde}
                  alt="Tamale with Salsa"
                  className="popup-image"
                />
                <div className="popup-actions">
                  <button
                    onClick={() => {
                      navigate("/OnlineOrdering/sides");
                      setShowPopup(false);
                    }}
                    className="add-salsa-btn"
                  >
                    Add Salsa
                  </button>
                </div>
              </>
            ) : (
              <p>Your sweet tamale was added 🎉</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TamaleBuilder;
