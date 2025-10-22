import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { BACKEND_URL } from "../constants/constants";
const CLIENT_ID = "universalmenu"; // 👈 your restaurant/client ID
import "../MenuGrid.css";

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
      <div style={{ marginTop: "1rem" }}>
        {menu.sections.map((section) => {
          const visibleUngroupedItems = (section.items || []).filter(
            (item) => item.visible !== false
          );

          return (
            <div
              key={section.id || section._id}
              style={{ marginBottom: "3rem" }}
            >
              <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
                {section.section}
              </h1>

              {/* 👇 Render Groups (NEW) */}
              {section.groups &&
                section.groups.length > 0 &&
                section.groups.map((group) => {
                  const visibleGroupItems = (group.items || []).filter(
                    (item) => item.visible !== false
                  );
                  if (visibleGroupItems.length === 0) return null;

                  return (
                    <div
                      key={group.id || group._id}
                      style={{ marginBottom: "2rem" }}
                    >
                      <h3
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {group.groupName}
                      </h3>
                      <div className="menu-grid">
                        {visibleGroupItems.map((item) => (
                          <div
                            key={item.id || item._id}
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              textAlign: "center",
                              opacity: item.available ? 1 : 0.6,
                            }}
                          >
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
                            <p style={{ marginBottom: "0.5rem" }}>
                              {item.name}
                            </p>
                            <p
                              style={{ marginBottom: "0.5rem", color: "grey" }}
                            >
                              {item.description}
                            </p>
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
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

              {/* 👇 Render ungrouped items as before */}
              {visibleUngroupedItems.length > 0 && (
                <div className="menu-grid">
                  {visibleUngroupedItems.map((item) => (
                    <div
                      key={item.id || item._id}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        textAlign: "center",
                        opacity: item.available ? 1 : 0.6,
                      }}
                    >
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
                      <p style={{ marginBottom: "0.5rem" }}>{item.name}</p>
                      <p style={{ marginBottom: "0.5rem", color: "grey" }}>
                        {item.description}
                      </p>
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
