import React, { useState, useMemo, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import tamalePrices from "./tamalePrices";
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

const fillings = [
  { name: "Chicken", value: "Chicken", img: pulledChickenImg },
  { name: "Pork", value: "Pork", img: pulledPorkImg },
  {
    name: "Rajas (pepper & cheese)",
    value: "Rajas (pepper & cheese)",
    img: rajasTamaleImg,
  },
  { name: "Chipilin", value: "Chipilin", img: chipillinImg },
  { name: "Black Bean", value: "Black Bean", img: blackBeanImg },
  { name: "Sweet", value: "Sweet Tamale", img: sweetTamaleImg },
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

  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useContext(CartContext);

  const [totalTamales, setTotalTamales] = useState(null);
  const [filling, setFilling] = useState(null);
  const [wrapper, setWrapper] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [useVegOil, setUseVegOil] = useState(false);
  const [addFruit, setAddFruit] = useState(false);

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
      if (typeof saved.useVegOil === "boolean") setUseVegOil(saved.useVegOil);
      if (typeof saved.addFruit === "boolean") setAddFruit(saved.addFruit);
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
        useVegOil,
        addFruit,
      })
    );
  }, [filling, wrapper, sauce, totalTamales, useVegOil, addFruit]);

  // ✅ Fixed clearing logic
  useEffect(() => {
    if (!filling) return;
    if (filling.value === "Sweet Tamale") {
      setWrapper(null);
      setSauce(null);
    } else if (filling.value === "Chipilin" || filling.value === "Black Bean") {
      setSauce(null);
    }
  }, [filling]);

  useEffect(() => {
    if (totalTamales === 0) {
      setFilling(null);
      setWrapper(null);
      setSauce(null);
      setUseVegOil(false);
      setAddFruit(false);
    }
  }, [totalTamales]);

  const selected = useMemo(() => {
    const assumedWrapper = (() => {
      if (filling?.value === "Sweet Tamale") return "Corn Husk";
      return wrapper?.value;
    })();

    const assumedSauce = (() => {
      if (
        filling?.value === "Sweet Tamale" ||
        filling?.value === "Chipilin" ||
        filling?.value === "Black Bean"
      )
        return "None";
      return sauce?.value || "None";
    })();

    return tamalePrices.find((item) => {
      return (
        item.filling === filling?.value &&
        item.wrapper === assumedWrapper &&
        item.sauce === assumedSauce &&
        (typeof item.vegOil === "undefined" || item.vegOil === useVegOil) &&
        (typeof item.fruit === "undefined" || item.fruit === addFruit)
      );
    });
  }, [filling, wrapper, sauce, useVegOil, addFruit]);

  const subtotal =
    selected?.price && totalTamales
      ? (selected.price * totalTamales).toFixed(2)
      : null;

  const hasAllRequiredSelections = (() => {
    if (!filling) return false;
    if (["Chicken", "Pork"].includes(filling.value)) {
      return wrapper && sauce;
    }
    if (filling.value === "Chipilin") {
      return wrapper !== null; // Chipilin requires wrapper
    }
    if (filling.value === "Black Bean") {
      return wrapper !== null; // Chipilin requires wrapper
    }
    return true;
  })();

  const isReady =
    selected &&
    selected.price &&
    hasAllRequiredSelections &&
    totalTamales &&
    totalTamales >= 12;

  const handleAddToCart = () => {
    if (!isReady) return;

    const newItem = {
      type: "tamale",
      ...selected,
      quantity: totalTamales,
    };

    // Add to context (which automatically updates localStorage)
    addToCartContext(newItem);

    if (newItem.filling?.toLowerCase() !== "sweet tamale") {
      setPopupType("salsa");
      setShowPopup(true);
    } else {
      setPopupType("basic");
      setShowPopup(true);
    }
  };

  // auto-hide popup after 10 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="step-container">
      <div className="other-options">
        <Link to="/drinks" className="category-link">
          🥤 Drinks
        </Link>
        <Link to="/sides" className="category-link">
          🥣 Sides
        </Link>
        <Link to="/appetizers" className="category-link">
          🍲 Soups
        </Link>
        <Link to="/antojos" className="category-link">
          🌽 Antojos
        </Link>
      </div>

      <h2> Build your TAMALE 🫔</h2>
      <PeopleCount setPeople={setTotalTamales} value={totalTamales} />

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
                setUseVegOil(false);
                setAddFruit(false);
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
          <h2>Choose Tamale Filling:</h2>
          <div className="grid">
            {fillings.map((item) => (
              <div
                key={item.value}
                className="option-card"
                onClick={() => setFilling(item)}
              >
                <img src={item.img} alt={item.name} className="product-img" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {filling &&
        ["Rajas (pepper & cheese)", "Chipilin"].includes(filling.value) && (
          <label>
            <input
              type="checkbox"
              checked={useVegOil}
              onChange={() => setUseVegOil(!useVegOil)}
            />
            Make with Veggie Oil
          </label>
        )}

      {filling && filling.value === "Sweet Tamale" && (
        <label>
          <input
            type="checkbox"
            checked={addFruit}
            onChange={() => setAddFruit(!addFruit)}
          />
          Add Fruit
        </label>
      )}

      {filling &&
        [
          "Chicken",
          "Pork",
          "Rajas (pepper & cheese)",
          "Chipilin",
          "Black Bean",
        ].includes(filling.value) &&
        !wrapper && (
          <>
            <h3 className="option-name">Choose Wrapper:</h3>
            <div className="grid">
              {wrappers.map((item) => (
                <div
                  key={item.value}
                  className="option-card"
                  onClick={() => setWrapper(item)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="tamale-builder-img"
                  />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </>
        )}

      {filling &&
        ["Chicken", "Pork", "Rajas (pepper & cheese)"].includes(
          filling.value
        ) &&
        wrapper &&
        !sauce && (
          <>
            <h3 className="option-name">Choose Sauce:</h3>
            <div className="grid">
              {sauces.map((item) => (
                <div
                  key={item.value}
                  className="option-card"
                  onClick={() => setSauce(item)}
                >
                  <img src={item.img} alt={item.name} className="grid-img" />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </>
        )}

      {isReady && (
        <>
          <h2>Summary:</h2>

          {selected.img && (
            <img
              src={selected.img}
              alt="Preview"
              className="selected-tamale-img"
            />
          )}

          <p>
            {`${totalTamales} ${selected.filling} tamales in ${
              selected.wrapper || "default wrapper"
            }${
              selected.sauce && selected.sauce !== "None"
                ? ` with ${selected.sauce} sauce`
                : ""
            }`}
          </p>

          <p>Total: ${subtotal}</p>

          <button onClick={handleAddToCart}>ADD TO CART</button>
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
                      navigate("/sides");
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
