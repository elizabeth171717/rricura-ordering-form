import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { BACKEND_URL } from "../constants/constants";
const CLIENT_ID = "universalmenu"; // 👈 your restaurant/client ID

function Menu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🥇 Initial fetch (load once)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/${CLIENT_ID}/menu`);
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // 🔌 Real-time updates via WebSocket
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket server");
    };

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

    socket.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("⚠️ WebSocket connection closed");
    };

    return () => socket.close();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  }

  if (!menu || !menu.sections) {
    return <p style={{ textAlign: "center" }}>No menu available</p>;
  }

  return (
    <div className="menu-container">
      <Navigation />
      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        {/* Sections */}
        {menu.sections.map((section) => {
          // Show only visible items
          const visibleItems = (section.items || []).filter(
            (item) => item.visible !== false
          );

          if (visibleItems.length === 0) return null;

          return (
            <div
              key={section.id || section._id}
              style={{ marginBottom: "3rem" }}
            >
              <h1
                style={{
                  borderBottom: "2px solid #ddd",
                  marginBottom: "1rem",
                  paddingBottom: "0.5rem",
                  textTransform: "capitalize",
                }}
              >
                {section.section}
              </h1>

              {/* Items inside section */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {visibleItems.map((item) => (
                  <div
                    key={item.id || item._id}
                    style={{
                      border: "1px solid #ccc",
                      padding: "1rem",
                      borderRadius: "10px",
                      textAlign: "center",
                      opacity: item.available ? 1 : 0.6, // dim unavailable items
                    }}
                  >
                    {/* Dish image */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "0.8rem",
                        }}
                      />
                    )}

                    <h3 style={{ marginBottom: "0.5rem" }}>{item.name}</h3>
                    <p style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>
                      {item.description}
                    </p>

                    {/* 👇 Show “Unavailable” label if not available */}
                    {!item.available && (
                      <p
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          marginTop: "0.5rem",
                        }}
                      >
                        ❌ Unavailable
                      </p>
                    )}

                    {/* Modifiers */}
                    {item.modifiers && item.modifiers.length > 0 && (
                      <div
                        style={{
                          marginTop: "0.5rem",
                          textAlign: "left",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "bold",
                            marginBottom: "0.3rem",
                          }}
                        >
                          Options:
                        </p>
                        <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                          {item.modifiers.map((mod) => (
                            <li key={mod.id}>
                              {mod.name}
                              {mod.price > 0 && ` ($${mod.price.toFixed(2)})`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
