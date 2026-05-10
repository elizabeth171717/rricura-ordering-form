import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { BACKEND_URL } from "../../constants/constants";

const client = import.meta.env.VITE_CLIENT;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/${client}/orders`
        );

        const data = await res.json();

        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch dashboard orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // ONLY PENDING ORDERS
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  );

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#111",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "30px",
        }}
      >
        Rricura Admin Dashboard
      </h1>

      {/* ALERT */}
      {pendingOrders.length > 0 ? (
        <div
          style={{
            padding: "40px",
            borderRadius: "25px",
            background:
              "linear-gradient(90deg, #ff0000, #ff7b00, #ffd000)",
            animation: "pulse 1s infinite",
            textAlign: "center",
            boxShadow: "0 0 50px red",
            marginBottom: "40px",
            cursor: "pointer",
          }}
        >
          <h2
            style={{
              fontSize: "4rem",
              margin: 0,
              textShadow: "0 0 20px black",
            }}
          >
            🚨 NEW ORDER ALERT 🚨
          </h2>

          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            You have {pendingOrders.length} pending order
            {pendingOrders.length > 1 ? "s" : ""}
          </p>
        </div>
      ) : (
        <div
          style={{
            padding: "30px",
            borderRadius: "20px",
            background: "#1e1e1e",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "2rem" }}>
            ✅ No Pending Orders
          </h2>
        </div>
      )}

      {/* NAV BUTTONS */}
      <div>
        <Link to="/admin/orders">
          <button
            style={{
              padding: "20px 40px",
              fontSize: "1.5rem",
              cursor: "pointer",
              borderRadius: "12px",
              border: "none",
            }}
          >
            View Orders
          </button>
        </Link>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 20px red;
            }

            50% {
              transform: scale(1.03);
              box-shadow: 0 0 80px orange;
            }

            100% {
              transform: scale(1);
              box-shadow: 0 0 20px red;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;