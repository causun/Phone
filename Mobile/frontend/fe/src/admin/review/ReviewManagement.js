import React, { useEffect, useState } from "react";
import AdminHeader from "../page/AdminHeader";
import adminAxios from "../../api/adminAxios";

export default function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterStar, setFilterStar] = useState(0);
  const [sort, setSort] = useState("newest");

  const [replyText, setReplyText] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  /* ================= LOAD ALL REVIEWS ================= */
  useEffect(() => {
    adminAxios
      .get("/reviews")
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.data;

        setReviews(list || []);
      })
      .catch((err) => {
        console.error("Load reviews error:", err.response?.data);
        // ❌ KHÔNG xử lý 401 ở đây
        // ✅ interceptor sẽ lo
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= SEND REPLY ================= */
  const sendReply = async () => {
    if (!replyText.trim()) {
      alert("Vui lòng nhập nội dung phản hồi");
      return;
    }

    try {
      await adminAxios.post(
        `/reviews/admin/${selectedReview.id}/reply`,
        replyText,
        { headers: { "Content-Type": "text/plain" } }
      );

      setReviews((prev) =>
        prev.map((r) =>
          r.id === selectedReview.id
            ? { ...r, adminReply: replyText }
            : r
        )
      );

      setReplyText("");
      setSelectedReview(null);

      alert("Đã gửi phản hồi");
    } catch (err) {
      console.error("Reply error:", err.response?.data);
      alert("Không thể gửi phản hồi");
    }
  };

  /* ================= FILTER + SORT (GIỮ NGUYÊN) ================= */
  const filtered = reviews
    .filter((r) => filterStar === 0 || r.rating === filterStar)
    .sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  return (
    <>
      <AdminHeader />

      <div style={styles.pageWrapper}>
        <h2 style={styles.pageTitle}>Quản lý đánh giá sản phẩm</h2>

        {/* ===== FILTER ===== */}
        <div style={{ marginBottom: 15, display: "flex", gap: 15 }}>
          <select
            value={filterStar}
            onChange={(e) => setFilterStar(Number(e.target.value))}
          >
            <option value={0}>Tất cả</option>
            {[5, 4, 3, 2, 1].map((s) => (
              <option key={s} value={s}>
                {s} sao
              </option>
            ))}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="highest">Sao cao → thấp</option>
            <option value="lowest">Sao thấp → cao</option>
          </select>
        </div>

        {loading && <p>Đang tải...</p>}

        {/* ===== REVIEW LIST ===== */}
        {filtered.map((r) => (
          <div key={r.id} style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{r.userName}</strong> ⭐{r.rating}
                <div style={{ color: "#555" }}>
                  {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>

            {r.comment && <div style={{ marginTop: 8 }}>{r.comment}</div>}

            {r.adminReply ? (
              <div style={styles.replyBox}>
                <b>Phản hồi:</b> {r.adminReply}
              </div>
            ) : (
              <button
                style={styles.replyBtn}
                onClick={() => setSelectedReview(r)}
              >
                Trả lời
              </button>
            )}
          </div>
        ))}

        {/* ===== POPUP ===== */}
        {selectedReview && (
          <div style={styles.popup}>
            <div style={styles.popupBox}>
              <h3>Phản hồi đánh giá</h3>
              <textarea
                style={styles.textarea}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button style={styles.saveBtn} onClick={sendReply}>
                Gửi phản hồi
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => setSelectedReview(null)}
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ================= STYLES (GIỮ NGUYÊN) ================= */
const styles = {
  pageWrapper: {
    maxWidth: 1380,
    margin: "90px auto 0 auto",
    padding: "28px 24px",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 22,
    color: "#0f172a",
    letterSpacing: ".2px",
  },

  card: {
    background: "#ffffff",
    padding: "18px 20px",
    borderRadius: 14,
    marginBottom: 14,
    boxShadow: "0 6px 20px rgba(0,0,0,.08)",
    transition: ".25s",
  },

  replyBtn: {
    marginTop: 12,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    boxShadow: "0 4px 14px rgba(37,99,235,.35)",
  },

  replyBox: {
    padding: "12px 14px",
    background: "#f1f5f9",
    borderRadius: 10,
    marginTop: 10,
    fontSize: 14,
    color: "#0f172a",
    borderLeft: "4px solid #2563eb",
  },

  popup: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },

  popupBox: {
    background: "#ffffff",
    padding: 22,
    borderRadius: 16,
    width: 420,
    boxShadow: "0 20px 50px rgba(0,0,0,.25)",
  },

  textarea: {
    width: "100%",
    height: 110,
    margin: "10px 0",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    resize: "none",
  },

  saveBtn: {
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "#fff",
    padding: "9px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    marginRight: 10,
  },

  cancelBtn: {
    padding: "9px 16px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    color: "#334155",
  },
};
