import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";
import "../DigitalMenu.css";

const CLIENT_ID = "universalmenu"; // 👈 your tenant ID

function DigitalMenu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🥇 Fetch menu on mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/${CLIENT_ID}/menu`);
        const data = await res.json();
        console.log("📦 MENU DATA RECEIVED:", data);
        setMenu(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // 🔌 WebSocket for live updates
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => console.log("✅ Connected to WebSocket server");
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "menu-update") {
          console.log("📡 Menu update received:", msg.data);
          setMenu(msg.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Error parsing WebSocket message:", err);
      }
    };

    socket.onerror = (err) => console.error("❌ WebSocket error:", err);
    socket.onclose = () => console.log("⚠️ WebSocket closed");

    return () => socket.close();
  }, []);

  if (loading) return <p className="loading-text">Loading menu...</p>;
  if (!menu || !menu.sections)
    return <p className="loading-text">No menu available</p>;

  // 🧩 Find Tamales Section
  const tamalesSection = menu.sections.find(
    (s) => s.section.toLowerCase() === "tamales"
  );

  const chickenCornHuskGroup =
    tamalesSection?.groups?.find(
      (g) =>
        g.groupName?.toLowerCase().includes("chicken") &&
        g.groupName?.toLowerCase().includes("corn husk")
    ) || null;

  const chickenCornHuskItems = chickenCornHuskGroup?.items || [];

  const chickenBananaLeafGroup =
    tamalesSection?.groups?.find(
      (g) =>
        g.groupName?.toLowerCase().includes("chicken") &&
        g.groupName?.toLowerCase().includes("banana leaf")
    ) || null;

  const chickenBananaLeafItems = chickenBananaLeafGroup?.items || [];

  const sweetGroup =
    tamalesSection?.groups?.find((g) =>
      g.groupName?.toLowerCase().includes("sweet")
    ) || null;

  const sweetItems = sweetGroup?.items || [];

  // 🧩 Find Drinks Section
  const drinksSection = menu.sections.find(
    (s) => s.section.toLowerCase() === "drinks"
  );

  const aguasFrescasGroup =
    drinksSection?.groups?.find(
      (g) =>
        g.groupName?.toLowerCase().includes("aguas") &&
        g.groupName?.toLowerCase().includes("frescas")
    ) || null;

  const aguasFrescasItems = aguasFrescasGroup?.items || [];

  const atoleGroup =
    drinksSection?.groups?.find((g) =>
      g.groupName?.toLowerCase().includes("atole")
    ) || null;

  const atoleItems = atoleGroup?.items || [];

  const moreGroup =
    drinksSection?.groups?.find((g) =>
      g.groupName?.toLowerCase().includes("more")
    ) || null;

  const moreItems = moreGroup?.items || [];

  // 🧩 Find Sides / Soups / Antojos sections
  const sidesSection = menu.sections.find(
    (s) => s.section.toLowerCase() === "sides"
  );
  const soupsSection = menu.sections.find(
    (s) => s.section.toLowerCase() === "soups"
  );
  const antojosSection = menu.sections.find(
    (s) => s.section.toLowerCase() === "antojos"
  );

  return (
    <div className="digital-menu-display">
      {/* LEFT COLUMN - Tamales */}
      <div className="left-column">
        <div className="column-title">
          {/* 👇 Section name */}
          {tamalesSection?.section && (
            <h1 className="menu-section-title">{tamalesSection.section}</h1>
          )}
        </div>
        <div className="corn-husk-section">
          <h3>CORN HUSK TAMALES $4.00 </h3>
          <h4>Chicken, Pork, Rajas, Black Bean & Chipillin</h4>
          {/* 🟩 RENDER ONLY THIS GROUP'S ITEMS HERE */}
          <div className="digital-menu-cards">
            {chickenCornHuskItems.map((item) => (
              <div key={item._id} className="menu-card">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-image"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <h3>BANANA LEAF TAMALES $6.00</h3>
        <h4>Chicken, Pork, Rajas, Black Bean & Chipillin</h4>
        {/* 🟩 RENDER ONLY THIS GROUP'S ITEMS HERE */}
        <div className="digital-menu-cards">
          {chickenBananaLeafItems.map((item) => (
            <div key={item._id} className="menu-card">
              {item.image && (
                <img src={item.image} alt={item.name} className="menu-image" />
              )}
            </div>
          ))}
        </div>
        <h3>Sweet Tamales $3.00 - Fruit Tamales $4.00</h3>
        {/* 🟩 RENDER ONLY THIS GROUP'S ITEMS HERE */}
        <div className="digital-menu-cards">
          {sweetItems.map((item) => (
            <div key={item._id} className="menu-card">
              {item.image && (
                <img src={item.image} alt={item.name} className="menu-image" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CENTER COLUMN - Drinks */}
      <div className="center-column">
        {/* 👇 Section name */}
        {drinksSection?.section && (
          <h1 className="menu-section-title">{drinksSection.section}</h1>
        )}
        <h3>Aguas Frescas $4.00</h3>
        {/* 🟩 RENDER ONLY THIS GROUP'S ITEMS HERE */}
        <div className="digital-menu-cards">
          {aguasFrescasItems.map((item) => (
            <div key={item._id} className="menu-card">
              {item.image && (
                <img src={item.image} alt={item.name} className="menu-image" />
              )}
            </div>
          ))}
        </div>
        <h3>Atole $4.00</h3>
        {/* 🟩 RENDER ONLY THIS GROUP'S ITEMS HERE */}
        <div className="digital-menu-cards">
          {atoleItems.map((item) => (
            <div key={item._id} className="menu-card">
              {item.image && (
                <img src={item.image} alt={item.name} className="menu-image" />
              )}
            </div>
          ))}
        </div>

        <h3>More Drinks</h3>
        {/* 🟩 RENDER ONLY THIS GROUP'S ITEMS HERE */}
        <div className="digital-menu-cards">
          {moreItems.map((item) => (
            <div key={item._id} className="menu-card">
              {item.image && (
                <img src={item.image} alt={item.name} className="menu-image" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ RIGHT COLUMN - Sides, Soups, Antojos (Cards) */}
      <div className="right-column">
        {/* ---- SIDES ---- */}

        <div className="menu-cards">
          {/* 👇 Section name */}
          {sidesSection?.section && (
            <h1 className="menu-section-title">{sidesSection.section}</h1>
          )}

          <div className="cards-container">
            {sidesSection?.items?.length > 0 ? (
              sidesSection.items.map((item) => (
                <div key={item._id} className="menu-card">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-image"
                    />
                  )}
                  <div className="menu-info">
                    <p className="menu-name">
                      {item.name} - ${item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-items">No sides available.</p>
            )}
          </div>
        </div>

        {/* ---- SOUPS ---- */}

        <div className="menu-cards">
          {/* 👇 Section name */}
          {soupsSection?.section && (
            <h1 className="menu-section-title">{soupsSection.section}</h1>
          )}
          <div className="cards-container">
            {soupsSection?.items?.length > 0 ? (
              soupsSection.items.map((item) => (
                <div key={item._id} className="menu-card">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-image"
                    />
                  )}
                  <div className="menu-info">
                    <p className="menu-name">
                      {item.name} - ${item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-items">No soups available.</p>
            )}
          </div>
        </div>

        {/* ---- ANTOJOS ---- */}

        <div className="menu-cards">
          {/* 👇 Section name */}
          {antojosSection?.section && (
            <h1 className="menu-section-title">{antojosSection.section}</h1>
          )}
          <div className="cards-container">
            {antojosSection?.items?.length > 0 ? (
              antojosSection.items.map((item) => (
                <div key={item._id} className="menu-card">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-image"
                    />
                  )}
                  <div className="menu-info">
                    <p className="menu-name">
                      {item.name} - ${item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-items">No antojos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalMenu;
