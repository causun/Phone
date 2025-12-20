import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import AdminLayout from "../../../layouts/AdminLayout";

export default function OrderAdmin() {
  const [orders, setOrders] = useState([]);

  const load = () => {
    axios.get("/orders/admin/all")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = (id, status) => {
    axios.put(`/orders/admin/update/${id}/${status}`)
      .then(() => load())
      .catch(err => {
        console.error(err);
        alert("Cập nhật trạng thái thất bại");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý đơn hàng</h2>

      {orders.length === 0 && <p>Chưa có đơn hàng.</p>}

      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 6, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Mã:</strong> {order.id} <br />
              <strong>Khách:</strong> {order.fullName} <br />
              <strong>Trạng thái:</strong> {order.status} <br />
              <strong>Ngày:</strong> {new Date(order.createdAt).toLocaleString()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => updateStatus(order.id, "APPROVED")} className="btn btn-success">Duyệt</button>
              <button onClick={() => updateStatus(order.id, "REJECTED")} className="btn btn-danger">Từ chối</button>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <strong>Sản phẩm:</strong>
            {order.items && order.items.map(i => (
              <div key={i.id} style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
                <img src={i.image ? (i.image.startsWith("http") ? i.image : `http://localhost:8081/uploads/products/${i.image}`) : "/placeholder.png"} alt={i.productName} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6 }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{i.productName}</div>
                  <div>{i.quantity} x {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(i.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
