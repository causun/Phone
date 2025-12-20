import React, { useState } from "react";
import axios from "axios";
import "./ReviewModal.css";

export default function ReviewModal({
  open,
  onClose,
  onReviewed,
  orderId,
  productId,
  productName,
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("trip-token");

      await axios.post(
        `http://localhost:8080/api/reviews/${orderId}/${productId}`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Đánh giá thành công");
      onReviewed(orderId, productId);
      onClose();
    } catch (e) {
      const msg = e?.response?.data || "";

      // nếu quá 24h thì modal đóng, và đánh dấu reviewed
      if (msg.toLowerCase().includes("24")) {
        onReviewed(orderId, productId);
        onClose();
        return;
      }
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <h3>Đánh giá sản phẩm</h3>
        <p className="product-name">{productName}</p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={s <= rating ? "active" : ""}
              onClick={() => setRating(s)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Cảm nhận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Đóng</button>
          <button disabled={!comment || loading} onClick={handleSubmit}>
            {loading ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
      </div>
    </div>
  );
}
