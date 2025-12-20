import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "./AdminHeader";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedStatus = query.get("status");

  useEffect(() => {
    loadOrders();
  }, []);

  /* ================= LOAD ORDERS (GIỮ NGUYÊN THUẬT TOÁN) ================= */
  const loadOrders = async () => {
    try {
      const res = await adminAxios.get("/orders");

      const sorted = (res.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sorted);
    } catch (err) {
      console.log("ERROR =====> ", err.response?.data);
      // 401 sẽ được interceptor xử lý tự động
    }
  };

  /* ================= CHANGE STATUS (GIỮ NGUYÊN) ================= */
  const changeStatus = async (id, status) => {
    try {
      await adminAxios.put(`/orders/${id}/status`, { status });
      loadOrders();
    } catch (err) {
      alert(err.response?.data || "Không thể cập nhật trạng thái");
    }
  };

  /* ================= RENDER STATUS (GIỮ NGUYÊN) ================= */
  const renderStatus = (s) => {
    const icons = {
      PENDING: "⏳",
      CONFIRMED: "✔️",
      SHIPPING: "🚚",
      COMPLETED: "🎉",
      CANCELLED: "❌",
    };
    const labels = {
      PENDING: "Chờ xác nhận",
      CONFIRMED: "Đã xác nhận",
      SHIPPING: "Đang giao",
      COMPLETED: "Hoàn thành",
      CANCELLED: "Đã hủy",
    };
    return `${icons[s]} ${labels[s]}`;
  };

  const isLocked = (s) =>
    s === "COMPLETED" || s === "CANCELLED";

  const filteredOrders = selectedStatus
    ? orders.filter((o) => o.status === selectedStatus)
    : orders;

  return (
    <>
      <AdminHeader />

      <div className="admin-orders">
        <h2>
          Quản lý đơn hàng{" "}
          {selectedStatus && (
            <small>(lọc: {renderStatus(selectedStatus)})</small>
          )}
        </h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Khách hàng</th>
              <th>Liên hệ</th>
              <th>Địa chỉ</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td><strong>{o.fullName}</strong></td>
                <td>{o.phone}</td>
                <td className="addr">{o.address}</td>

                <td className="price">
                  {o.totalPrice.toLocaleString()} ₫
                </td>

                <td>
                  <span className={`status st-${o.status}`}>
                    {renderStatus(o.status)}
                  </span>
                </td>

                <td>
                  <button
                    className="btn-view"
                    onClick={() => setSelectedOrder(o)}
                  >
                    Xem
                  </button>

                  <select
                    disabled={isLocked(o.status)}
                    value={o.status}
                    onChange={(e) =>
                      changeStatus(o.id, e.target.value)
                    }
                  >
                    <option value="PENDING">Chờ xác nhận</option>
                    <option value="CONFIRMED">Đã xác nhận</option>
                    <option value="SHIPPING">Đang giao</option>
                    <option value="COMPLETED">Hoàn thành</option>
                    <option value="CANCELLED">Đã hủy</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== ORDER DETAIL POPUP ===== */}
      {selectedOrder && (
        <div className="order-popup">
          <div className="popup-box">
            <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>

            <p><b>Khách:</b> {selectedOrder.fullName}</p>
            <p><b>Điện thoại:</b> {selectedOrder.phone}</p>
            <p><b>Địa chỉ:</b> {selectedOrder.address}</p>
            <p><b>Trạng thái:</b> {renderStatus(selectedOrder.status)}</p>

            <table className="detail-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>SL</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {(selectedOrder.items || selectedOrder.orderItems || []).map(
                  (i, idx) => (
                    <tr key={idx}>
                      <td>{i.productName || i.product?.name}</td>
                      <td>{i.quantity}</td>
                      <td>{i.price.toLocaleString()} ₫</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="popup-footer">
              <strong>
                Tổng tiền: {selectedOrder.totalPrice.toLocaleString()} ₫
              </strong>
              <button onClick={() => setSelectedOrder(null)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== CSS GIỮ NGUYÊN ===== */}
      {/* (phần style bạn giữ nguyên không cần sửa) */}
    </>
  );
}
