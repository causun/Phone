import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1>Order Management</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><th>ID</th><th>User</th><th>Status</th></tr></thead>
        <tbody>
          {orders.map(o=>(
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user?.name}</td>
              <td>{o.approved ? "Approved" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
