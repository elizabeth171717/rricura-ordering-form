// src/pages/PosTerminal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import "../MenuGrid.css";

const CLIENT_ID = "universalmenu";

function PosTerminal() {
  const [menu, setMenu] = useState(null);
  const [cart, setCart] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(true);
  const [noteModal, setNoteModal] = useState(null);
  const [tempNote, setTempNote] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Normalize menu: add stable menuId to each item so matching is reliable
  const normalizeMenu = (raw) => {
    if (!raw || !raw.sections) return raw;
    const normalized = {
      ...raw,
      sections: raw.sections.map((section) => {
        const secId = section.id || section._id || section.section;
        // normalize items in section (ungrouped)
        const normItems = (section.items || []).map((item, idx) => {
          const itemId = item.id || item._id || item.name || `item-${idx}`;
          return {
            ...item,
            menuId: `${secId}::nogroup::${itemId}`,
            price: Number(item.price || 0),
          };
        });

        // normalize groups
        const normGroups = (section.groups || []).map((group, gidx) => {
          const groupId =
            group.id || group._id || group.groupName || `group-${gidx}`;
          const groupItems = (group.items || []).map((item, idx) => {
            const itemId = item.id || item._id || item.name || `item-${idx}`;
            return {
              ...item,
              menuId: `${secId}::${groupId}::${itemId}`,
              price: Number(item.price || 0),
            };
          });
          return { ...group, items: groupItems };
        });

        return { ...section, items: normItems, groups: normGroups };
      }),
    };
    return normalized;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/${CLIENT_ID}/menu`);
        const data = await res.json();
        const norm = normalizeMenu(data);
        setMenu(norm);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Helper: create unique cart _id
  const makeCartId = (menuId) =>
    `${menuId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // addToCart: if same menuId is already present, increment that row's quantity
  const addToCart = (item) => {
    const menuId = item.menuId || item._id || item.id || item.name;
    // check if a cart row exists for that menuId
    const existing = cart.find((c) => c.menuId === menuId);

    if (existing) {
      setCart((prev) =>
        prev.map((c) =>
          c.menuId === menuId ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      // Add new cart row with stable base menuId and unique _id for the row
      const row = {
        _id: makeCartId(menuId),
        menuId,
        name: item.name,
        price: Number(item.price || 0),
        note: item.note || "",
        quantity: 1,
      };
      setCart((prev) => [...prev, row]);
    }
  };

  const removeItem = (rowId) => {
    setCart((prev) => prev.filter((r) => r._id !== rowId));
  };

  const duplicateItem = (row) => {
    const dup = {
      ...row,
      _id: makeCartId(row.menuId),
    };
    setCart((prev) => [...prev, dup]);
  };

  // open note modal for cart row
  const openNoteModal = (rowId) => {
    const row = cart.find((r) => r._id === rowId);
    setTempNote(row ? row.note || "" : "");
    setNoteModal({ show: true, id: rowId });
  };

  const saveNote = () => {
    if (!noteModal) return;
    const id = noteModal.id;
    setCart((prev) =>
      prev.map((r) => (r._id === id ? { ...r, note: tempNote } : r))
    );
    setNoteModal(null);
    setTempNote("");
  };

  // totals
  const subtotal = cart.reduce(
    (s, r) => s + (Number(r.price) || 0) * (r.quantity || 0),
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = async () => {
    if (!paymentType) {
      alert("Select payment type first");
      return;
    }
    try {
      await axios.post(`${BACKEND_URL}/api/orders`, {
        items: cart,
        subtotal,
        tax,
        total,
        paymentType,
        source: "POS",
      });
      alert(`Payment successful (${paymentType}). Order saved!`);
      setCart([]);
      setPaymentType("");
    } catch (err) {
      console.error(err);
      alert("Error saving order");
    }
  };

  if (loading) return <div className="p-4">Loading menu...</div>;
  if (!menu || !menu.sections)
    return <div className="p-4">No menu available</div>;

  // RENDER LEFT MENU NAVIGATION (Sections → Groups → Items)
  const renderMenuContent = () => {
    if (!selectedSection) {
      return (
        <div className="grid grid-cols-2 gap-2">
          {menu.sections.map((section) => (
            <button
              key={section.id || section._id || section.section}
              className="border p-3 rounded text-sm"
              onClick={() => {
                setSelectedSection(section);
                setSelectedGroup(null);
              }}
            >
              {section.section}
            </button>
          ))}
        </div>
      );
    }

    if (selectedSection && !selectedGroup) {
      const hasGroups = (selectedSection.groups || []).length > 0;
      return (
        <div>
          <button
            className="text-blue-600 underline mb-2"
            onClick={() => {
              setSelectedSection(null);
              setSelectedGroup(null);
            }}
          >
            ← Back to Sections
          </button>

          <h2 className="font-bold text-center mb-2">
            {selectedSection.section}
          </h2>

          {hasGroups ? (
            <div className="grid grid-cols-2 gap-2">
              {selectedSection.groups.map((group) => (
                <button
                  key={group.id || group._id || group.groupName}
                  className="border p-3 rounded text-sm"
                  onClick={() => {
                    setSelectedGroup(group);
                  }}
                >
                  {group.groupName}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {(selectedSection.items || [])
                .filter((i) => i.visible !== false && i.available !== false)
                .map((item) => (
                  <button
                    key={item.menuId}
                    className="border rounded p-2 text-left"
                    onClick={() => addToCart(item)}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: 8,
                          marginBottom: 4,
                        }}
                      />
                    )}
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs">
                      ${Number(item.price || 0).toFixed(2)}
                    </p>
                  </button>
                ))}
            </div>
          )}
        </div>
      );
    }

    // selectedGroup -> show items within
    if (selectedGroup) {
      return (
        <div>
          <button
            className="text-blue-600 underline mb-2"
            onClick={() => setSelectedGroup(null)}
          >
            ← Back to {selectedSection.section}
          </button>

          <h3 className="font-bold text-center mb-2">
            {selectedGroup.groupName}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {(selectedGroup.items || [])
              .filter((i) => i.visible !== false && i.available !== false)
              .map((item) => (
                <button
                  key={item.menuId}
                  className="border rounded p-2 text-left"
                  onClick={() => addToCart(item)}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 4,
                      }}
                    />
                  )}
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs">
                    ${Number(item.price || 0).toFixed(2)}
                  </p>
                </button>
              ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* LEFT SIDE */}
      <div className="overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">POS Menu</h1>
        {renderMenuContent()}
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-50 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-3">Order Summary</h2>

          {cart.length === 0 ? (
            <p>No items added yet</p>
          ) : (
            cart.map((row) => (
              <div
                key={row._id}
                className="flex justify-between items-center border-b border-gray-200 py-1"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {row.name} × {row.quantity}
                  </span>

                  <span className="text-xs text-gray-600">
                    ${Number(row.price).toFixed(2)}
                  </span>
                  {row.note && (
                    <span className="text-xs text-gray-500">📝 {row.note}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button onClick={() => openNoteModal(row._id)}>📝</button>
                  <button onClick={() => duplicateItem(row)}>🔁</button>
                  <button
                    onClick={() => removeItem(row._id)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          )}

          <hr className="my-3" />
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax (8%): ${tax.toFixed(2)}</p>
          <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Payment Type:</h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPaymentType("Cash")}
              className={`p-2 rounded border ${
                paymentType === "Cash" ? "bg-green-200" : ""
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setPaymentType("Card")}
              className={`p-2 rounded border ${
                paymentType === "Card" ? "bg-green-200" : ""
              }`}
            >
              Card
            </button>
          </div>

          <button
            onClick={handlePayment}
            className="bg-green-500 text-white p-3 rounded w-full font-bold"
          >
            Complete Payment
          </button>
        </div>

        {/* NOTE MODAL */}
        {noteModal?.show && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg w-80 text-center">
              <h3 className="font-semibold mb-2">Add Note</h3>
              <textarea
                placeholder="Type note here..."
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                className="w-full h-24 border rounded p-2 text-sm mb-3"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setNoteModal(null);
                    setTempNote("");
                  }}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PosTerminal;
