import React, { useEffect, useState } from "react";
import Navigation from "../Navbar/Navigation";
import { BACKEND_URL } from "../../constants/constants";

const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "rricura-tamales";
import "./MenuGrid.css";

function Menu() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🥇 Initial fetch (load once)
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`,
        );
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

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  }

  if (!menu || !menu.sections) {
    return <p style={{ textAlign: "center" }}>No menu available</p>;
  }

  return (
    <div className="menu-container">
      <Navigation />
   <div className="menu-content">
  {menu.sections.map((section) => {
    const ungroupedItems = (section.items || []).filter(
      (item) => item.visible !== false
    );

    const groupedItems = (section.groups || []).flatMap((group) =>
      (group.items || []).filter((item) => item.visible !== false)
    );

    // Combine everything in the section, without displaying groups
    const allItems = [...ungroupedItems, ...groupedItems];

    if (allItems.length === 0) return null;

    return (
      <section
        className="menu-section"
        key={section.id || section._id}
      >
        <h2 className="section-name">{section.section}</h2>

        <div className="menu-grid">
          {allItems.map((item) => (
            <div
              className="menu-item"
              key={item.id || item._id}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                />
              )}

              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  })}
</div>
    </div>
  );
}

export default Menu;
