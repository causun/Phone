import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/orders").then(res => setOrders(res.data));
    axios.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Orders: {orders.length}</p>
      <p>Total Products: {products.length}</p>
    </div>
  );
}

export default Dashboard;
