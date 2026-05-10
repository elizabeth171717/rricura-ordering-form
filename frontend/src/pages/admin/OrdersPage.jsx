import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "./Receipt";
import "./OrdersPage.css";


import { BACKEND_URL } from "../../constants/constants";

console.log("📦 Backend URL:", BACKEND_URL);
const client = import.meta.env.VITE_CLIENT;
console.log("🏷️ Client tenant:", client); // should say "rricura"

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchOrderNumber, setSearchOrderNumber] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const receiptRef = useRef();

  const printReceipt = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${
      orders.find((o) => o._id === selectedOrderId)?.orderNumber
    }`,
  });

  const handlePrint = (order) => {
    setSelectedOrderId(order._id);
    setTimeout(() => {
      printReceipt();
    }, 100);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${client}/orders`
        );
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const fetchFilteredOrders = async () => {
    const params = new URLSearchParams();
    if (searchName) params.append("name", searchName);
    if (searchEmail) params.append("email", searchEmail);
    if (searchOrderNumber) params.append("orderNumber", searchOrderNumber);

    try {
      const res = await fetch(
        `${BACKEND_URL}/${client}/orders?${params.toString()}`
      );
      const data = await res.json();
      setFilteredOrders(data);
    } catch (err) {
      console.error("Error fetching filtered orders", err);
    }
  };

  const displayedOrders = filteredOrders.length > 0 ? filteredOrders : orders;

  const markAsDelivered = async (orderId) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/${client}/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Delivered" }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      const updatedOrder = await res.json();

      // Update local state (filteredOrders or orders)
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? updatedOrder : o))
      );

      setFilteredOrders((prev) =>
        prev.map((o) => (o._id === orderId ? updatedOrder : o))
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <a href="/admin/dashboard">← Back to Dashboard</a>
      <h2 className="dashboard-title">Rricura Orders</h2>

      {/* Search Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by order #"
          value={searchOrderNumber}
          onChange={(e) => setSearchOrderNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <div className="action-btns">
        <button onClick={fetchFilteredOrders}>Search</button>
        <button
          onClick={() => {
            setSearchName("");
            setSearchEmail("");
            setSearchOrderNumber("");
            fetchFilteredOrders();
          }}
        >
          Reset
        </button></div>

      </div>

      {/* Order Table */}
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Order #</th>
              <th>Email</th>

              <th>Total</th>

              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.map((order) => {
              const isExpanded = selectedOrderId === order._id;

              return (
                <React.Fragment key={order._id}>
                  <tr
                    className="order-row"
                    onClick={() =>
                      setSelectedOrderId(isExpanded ? null : order._id)
                    }
                  >
                    <td>{order.customerName}</td>
                    <td>{order.orderNumber}</td>
                    <td>{order.customerEmail}</td>

                    <td>${order.total?.toFixed(2)}</td>

                    <td>
                      {order.status}
                      {order.status === "Pending" && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row toggle
                            markAsDelivered(order._id);
                          }}
                          className="status-btn"
                        >
                          Mark as Delivered
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        className="print-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrint(order);
                        }}
                      >
                        🖨️ Print
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="expanded-row">
                      <td colSpan="8">
                        <div className="expanded-content">
                          <p>
                            <strong>Phone:</strong> {order.customerPhone}
                          </p>
                          <p>
                            <strong>Items:</strong>
                          </p>

                          <ul>
                            {order.items?.map((item, idx) => {
                              const getItemDescription = (item) => {
                                if (item.filling) {
                                  let description = `${item.filling} tamale`;
                                  if (item.wrapper)
                                    description += ` - ${item.wrapper}`;
                                  if (item.sauce && item.sauce !== "None")
                                    description += ` - ${item.sauce} sauce`;
                                  if (item.vegOil)
                                    description += " - Veggie Oil";
                                  if (item.fruit)
                                    description += " - with Fruit";
                                  return description;
                                }
                                if (item.name) return item.name;
                                return "Custom item";
                              };

                              const labelStart = `${item.quantity}${
                                item.size
                                  ? " " + item.size
                                  : item.unit
                                  ? " " + item.unit
                                  : ""
                              }`;

                              const price = parseFloat(item.price) || 0;

                              return (
                                <li key={idx}>
                                  {labelStart} {getItemDescription(item)} — $
                                  {(price * item.quantity).toFixed(2)}
                                </li>
                              );
                            })}
                          </ul>

                          <p>
                            <strong>PromoCode:</strong>
                            {order.coupon || "-"}
                          </p>
                          <p>
                            <strong>Discount:</strong>
                            {order.discount > 0
                              ? `-$${order.discount.toFixed(2)}`
                              : "-"}
                          </p>
                          <p>
                            <strong>Subtotal:</strong>$
                            {order.subtotal?.toFixed(2)}
                          </p>
                          <p>
                            <strong>Tax:</strong> ${order.tax?.toFixed(2)}
                          </p>
                          <p>
                            <strong>Delivery Fee:</strong> $
                            {order.deliveryAddress?.fee?.toFixed(2) || "0.00"}
                          </p>
                          <p>
                            <strong>Tip:</strong> $
                            {order.tip?.toFixed(2) || "0.00"}
                          </p>
                          <p>
                            <strong>DeliveryDate & Time:</strong>{" "}
                            {order.deliveryDate} at {order.deliveryTime}
                          </p>
                          <p>
                            <strong>Delivery Address:</strong>{" "}
                            {order.deliveryAddress?.fullAddress}
                          </p>
                          {order.deliveryAddress?.instructions && (
                            <p>
                              <strong>Instructions:</strong>{" "}
                              {order.deliveryAddress.instructions}
                            </p>
                          )}
                          {order.message && (
                            <p>
                              <strong>Message:</strong> {order.message}
                            </p>
                          )}
                          {order.createdAt && (
                            <p>
                              <strong>Ordered:</strong>{" "}
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Hidden Receipt for Printing */}
      {selectedOrderId && (
        <div style={{ display: "none" }}>
          <div ref={receiptRef}>
            <Receipt order={orders.find((o) => o._id === selectedOrderId)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
