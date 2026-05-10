import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Rricura Admin Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <Link to="/admin/orders">
          <button>View Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;