import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navbar/Navigation";
import { BACKEND_URL } from "../../constants/constants";

const CLIENT_ID = "anahuac";
const RESTAURANT_SLUG = "rricura-tamales";

function MondayMenuSelection() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ stores selected Monday items
  const [mondaySpecials, setMondaySpecials] = useState([]);

  // =============================
  // LOAD MENU + SAVED MONDAY VIEW
  // =============================
 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      // =============================
      // FETCH MENU
      // =============================
      const menuRes = await fetch(
        `${BACKEND_URL}/api/${CLIENT_ID}/public-menu/${RESTAURANT_SLUG}`
      );

      if (!menuRes.ok) {
        throw new Error("Failed fetching menu");
      }

      const menuData = await menuRes.json();

      setMenu(menuData);

      // =============================
      // FETCH SAVED MONDAY VIEW
      // =============================
      const viewRes = await fetch(
        `${BACKEND_URL}/api/${CLIENT_ID}/monday-views/monday-specials`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🚨 IMPORTANT
      if (!viewRes.ok) {
        const errorText = await viewRes.text();

        console.error(
          "❌ Monday view fetch failed:",
          viewRes.status,
          errorText
        );

        return;
      }

      const viewData = await viewRes.json();

      console.log("✅ VIEW DATA:", viewData);

      setMondaySpecials(viewData.selectedItems || []);

    } catch (err) {
      console.error("❌ Failed loading Monday dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // =============================
  // TOGGLE MONDAY SPECIAL
  // =============================
  const toggleMondaySpecial = async (itemId) => {
    let updatedItems = [];

    // ✅ remove item
    if (mondaySpecials.includes(itemId)) {
      updatedItems = mondaySpecials.filter(
        (id) => id !== itemId
      );
    }

    // ✅ add item
    else {
      updatedItems = [...mondaySpecials, itemId];
    }

    // ✅ instant UI update
    setMondaySpecials(updatedItems);

 try {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BACKEND_URL}/api/${CLIENT_ID}/monday-views/monday-specials`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        restaurantSlug: RESTAURANT_SLUG,
        selectedItems: updatedItems,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "❌ PATCH FAILED:",
      response.status,
      errorText
    );

    return;
  }

  const data = await response.json();

  console.log("✅ SAVED VIEW:", data);

} catch (err) {
  console.error("❌ Failed to update Monday specials:", err);
}
};
  // =============================
  // CHECK IF ITEM IS SELECTED
  // =============================
  const isMondaySpecial = (itemId) => {
    return mondaySpecials.includes(itemId);
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
  // NO MENU
  // =============================
  if (!menu || !menu.sections) {
    return (
      <p style={{ textAlign: "center" }}>
        No menu available
      </p>
    );
  }

  // =============================
  // UI
  // =============================
  return (
    <div className="menu-container">
      <Navigation />

      <div className="menu-content">

        {menu.sections.map((section) => {
          const visibleUngroupedItems = (
            section.items || []
          ).filter((item) => item.visible !== false);

          return (
            <div key={section.id}>

              <h2 className="section-name">
                {section.section}
              </h2>

              {/* =============================
                  GROUPS
              ============================== */}
              {section.groups &&
                section.groups.length > 0 &&
                section.groups.map((group) => {

                  const visibleGroupItems = (
                    group.items || []
                  ).filter(
                    (item) => item.visible !== false
                  );

                  if (visibleGroupItems.length === 0) {
                    return null;
                  }

                  return (
                    <div key={group.id}>

                      <h3 className="group-name">
                        {group.groupName}
                      </h3>

                      <div className="menu-grid">

                        {visibleGroupItems.map((item) => (
                          <div key={item.id}>

                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                              />
                            )}

                            <p>{item.name}</p>

                            <button
                              onClick={() =>
                                toggleMondaySpecial(item.id)
                              }
                            >
                              {isMondaySpecial(item.id)
                                ? "✓ Remove"
                                : "+ Add to Monday"}
                            </button>

                          </div>
                        ))}

                      </div>
                    </div>
                  );
                })}

              {/* =============================
                  UNGROUPED ITEMS
              ============================== */}
              {visibleUngroupedItems.length > 0 && (
                <div className="menu-grid">

                  {visibleUngroupedItems.map((item) => (
                    <div key={item.id}>

                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      )}

                      <p style={{ marginBottom: "0.5rem" }}>
                        {item.name}
                      </p>

                      <button
                        onClick={() =>
                          toggleMondaySpecial(item.id)
                        }
                      >
                        {isMondaySpecial(item.id)
                          ? "✓ Remove"
                          : "+ Add to Monday"}
                      </button>

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

export default MondayMenuSelection;