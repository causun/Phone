import React, { useEffect, useState } from "react";
import "../css/oders/MyOrdersPage.css";
import axios from "axios";

import PageHeader from "../components/page/PageHeader";
import { useNavigate } from "react-router-dom";
import ReviewModal from "../components/review/ReviewModal";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  const [open, setOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentProductName, setCurrentProductName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("trip-token");

      if (!token) {
        navigate("/login");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      try {
        // ========== get user ==========
        const userRes = await axios.get(
          "http://localhost:8080/api/auth/user/me",
          { headers }
        );

        // ========== get orders ==========
        const ordersRes = await axios.get(
          "http://localhost:8080/api/orders/my",
          { headers }
        );

        // ========== get reviews ==========
        let myReviews = [];
        try {
          const reviewsRes = await axios.get(
            "http://localhost:8080/api/reviews/me",
            { headers }
          );

          myReviews = Array.isArray(reviewsRes.data)
            ? reviewsRes.data
            : reviewsRes.data?.data || [];
        } catch {
          console.warn("Không lấy được reviews → []");
        }

        setUser(userRes.data.data);

        // ⭐ SORT mới nhất trước
        const sortedOrders = (ordersRes.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // merge reviewed
        const merged = sortedOrders.map((order) => ({
          ...order,
          items: order.items?.map((item) => ({
            ...item,
            reviewed: myReviews.some(
              (r) =>
                r.orderId === order.id &&
                r.productId === item.productId
            ),
          })),
        }));

        setOrders(merged);
      } catch (e) {
        console.error("Lỗi load MyOrdersPage:", e?.response || e);

        const status = e?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("trip-token");
          navigate("/login");
        }
      }
    };

    loadData();
  }, [navigate]);

  const openReview = (orderId, productId, productName) => {
    setCurrentOrderId(orderId);
    setCurrentProductId(productId);
    setCurrentProductName(productName);
    setOpen(true);
  };

  const markReviewed = (orderId, productId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              items: o.items.map((i) =>
                i.productId === productId
                  ? { ...i, reviewed: true }
                  : i
              ),
            }
          : o
      )
    );
  };

  return (
    <>
      <PageHeader user={user} />

      <div className="order-container">
        <h2>Đơn hàng của bạn</h2>

        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            {/* ===== HEADER ===== */}
            <div className="order-header">
              <span>Mã đơn #{order.id}</span>
              <span className={`order-status status-${order.status}`}>
                {translateStatus(order.status)}
              </span>
            </div>

            {/* ===== PRODUCTS ===== */}
            <div className="order-products">
              {order.items?.map((item) => (
                <div className="order-product" key={item.productId}>
                  <img src={item.imageUrl} alt="" />
                  <div>
                    <div className="name">{item.productName}</div>

                    {order.status === "COMPLETED" &&
                      (item.reviewed ? (
                        <button disabled>Đã đánh giá</button>
                      ) : (
                        <button
                          onClick={() =>
                            openReview(
                              order.id,
                              item.productId,
                              item.productName
                            )
                          }
                        >
                          Đánh giá
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== ACTION ===== */}
            <div className="order-actions">
              <button
                className="btn-detail"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                Xem chi tiết đơn hàng →
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReviewModal
        open={open}
        onClose={() => setOpen(false)}
        orderId={currentOrderId}
        productId={currentProductId}
        productName={currentProductName}
        onReviewed={markReviewed}
      />
    </>
  );
}

/* ================= STATUS ================= */
function translateStatus(status) {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "SHIPPING":
      return "Đang giao";
    case "COMPLETED":
      return "Giao thành công";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return status;
  }
}
