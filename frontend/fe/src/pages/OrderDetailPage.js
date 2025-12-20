import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/page/PageHeader";
import "../css/page/orderDetail.css";

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ORDER ================= */
  useEffect(() => {
    const token = localStorage.getItem("trip-token");

    axios
      .get(`http://localhost:8080/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res?.data?.data ?? res.data;
        setOrder(data);
      })
      .catch((err) => {
        console.error(err.response?.data || err);
        alert("Không tìm thấy đơn hàng");
        navigate("/my-orders");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  /* ================= FORMAT ================= */
  const formatMoney = (v) =>
    v != null ? v.toLocaleString("vi-VN") + " ₫" : "--";

  // 🔥 FIX: xử lý LocalDateTime dạng mảng + string
  const formatDate = (d) => {
    if (!d) return "-";

    // Backend trả LocalDateTime dạng mảng
    if (Array.isArray(d)) {
      // [year, month, day, hour, minute, second]
      const [year, month, day] = d;
      return `${String(day).padStart(2, "0")}/${String(month).padStart(
        2,
        "0"
      )}/${year}`;
    }

    // Backend trả string ISO
    const date = new Date(d);
    return isNaN(date)
      ? "-"
      : date.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
  };

  if (loading) return <p className="od-loading">Đang tải...</p>;
  if (!order) return null;

  return (
    <>
      <PageHeader />

      <div className="od-wrapper">
        <div className="od-card">
          {/* ===== HEADER ===== */}
          <div className="od-header">
            <div>
              <h2>Đơn hàng #{order.id}</h2>
              <p className="od-date">
                Ngày đặt: <b>{formatDate(order.createdAt)}</b>
              </p>
            </div>

            <span className={`od-status status-${order.status}`}>
              {order.status}
            </span>
          </div>

          {/* ===== SHIPPING INFO ===== */}
          <div className="od-section">
            <h3>Thông tin giao hàng</h3>
            <div className="od-info">
              <p>
                <b>Họ tên:</b> {order.fullName}
              </p>
              <p>
                <b>SĐT:</b> {order.phone}
              </p>
              <p>
                <b>Địa chỉ:</b> {order.address}
              </p>
            </div>
          </div>

          {/* ===== ITEMS ===== */}
          <div className="od-section">
            <h3>Sản phẩm</h3>

            <div className="od-items">
              {order.items.map((i, index) => (
                <div key={index} className="od-item">
                  <div className="od-item-left">
                    <img
                      src={i.imageUrl}
                      alt={i.productName}
                    />
                    <div>
                      <p className="od-item-name">{i.productName}</p>
                      <p className="od-item-qty">
                        Số lượng: x{i.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="od-item-price">
                    {formatMoney(i.price * i.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== TOTAL ===== */}
          <div className="od-total">
            <span>Tổng tiền</span>
            <span className="price">
              {formatMoney(order.totalPrice)}
            </span>
          </div>

          {/* ===== ACTION ===== */}
          <div className="od-actions">
            <button onClick={() => navigate("/my-orders")}>
              ← Quay lại đơn hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
