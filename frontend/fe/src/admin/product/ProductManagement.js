// src/admin/product/ProductManagement.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import adminAxios from "../../api/adminAxios";
import AdminHeader from "../page/AdminHeader";

export default function ProductManagement() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    adminAxios
      .get("/products")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data;

        setProducts(data || []);
      })
      .catch((err) => {
        console.error("Lỗi load sản phẩm:", err.response?.data);
        // ❌ KHÔNG cần xử lý 401 ở đây
        // ✅ interceptor sẽ tự logout + redirect
      })
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price) =>
    price != null
      ? price.toLocaleString("vi-VN") + " ₫"
      : "--";

  return (
    <>
      <AdminHeader />
      <div style={{ height: 70 }} />

      <div style={styles.wrapper}>
        {/* ===== HEADER ===== */}
        <div style={styles.headerTop}>
          <h2 style={styles.pageTitle}>Quản lý sản phẩm</h2>

          <Link to="/admin/products/add" style={styles.addBtn}>
            <Plus size={18} />
            Thêm sản phẩm
          </Link>
        </div>

        {/* ===== TABLE HEADER ===== */}
        <div style={styles.tableHeader}>
          <div style={{ width: "40%" }}>Sản phẩm</div>
          <div style={{ width: "10%" }}>Giá</div>
          <div style={{ width: "10%" }}>Kho</div>
          <div style={{ width: "10%" }}>Trạng thái</div>
          <div style={{ width: "25%" }}>Thao tác</div>
        </div>

        {/* ===== CONTENT ===== */}
        {loading ? (
          <p style={{ padding: 20 }}>Đang tải...</p>
        ) : products.length === 0 ? (
          <p style={{ padding: 20 }}>Chưa có sản phẩm nào.</p>
        ) : (
          products.map((p) => (
            <div key={p.id} style={styles.tableRow}>
              {/* PRODUCT */}
              <div style={{ ...styles.rowCell, width: "40%" }}>
                <div style={styles.productCell}>
                  <img
                    src={p.imageUrls?.[0] || "/no-image.png"}
                    style={styles.thumbnail}
                    alt={p.name}
                  />

                  <div>
                    <strong>{p.name}</strong>
                    <div style={styles.skuText}>
                      ID: {p.id}
                    </div>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div style={{ ...styles.rowCell, width: "10%" }}>
                {formatPrice(p.finalPrice ?? p.price)}
              </div>

              {/* STOCK */}
              <div style={{ ...styles.rowCell, width: "10%" }}>
                {p.quantityInStock}
              </div>

              {/* STATUS */}
              <div style={{ ...styles.rowCell, width: "10%" }}>
                {p.status}
              </div>

              {/* ACTIONS */}
              <div style={{ ...styles.rowCell, width: "25%" }}>
                <Link
                  to={`/admin/products/edit/${p.id}`}
                  style={styles.actionLink}
                >
                  Cập nhật
                </Link>

                <Link
                  to={`/product/${p.id}`}
                  style={styles.actionLink}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

/* ================= STYLES (GIỮ NGUYÊN) ================= */
const styles = {
  wrapper: {
    padding: "28px 24px",
    maxWidth: 1380,
    margin: "auto",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: ".2px",
  },

  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    textDecoration: "none",
    padding: "11px 18px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    boxShadow: "0 6px 18px rgba(239,68,68,.35)",
    transition: ".25s",
  },

  tableHeader: {
    display: "flex",
    padding: "14px 16px",
    background: "#ffffff",
    borderRadius: 14,
    fontWeight: 700,
    color: "#475569",
    marginBottom: 12,
    boxShadow: "0 4px 14px rgba(0,0,0,.06)",
  },

  tableRow: {
    display: "flex",
    padding: "14px 16px",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: 14,
    marginBottom: 10,
    boxShadow: "0 4px 14px rgba(0,0,0,.05)",
    transition: ".25s",
  },

  rowCell: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: 500,
  },

  productCell: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  thumbnail: {
    width: 64,
    height: 64,
    objectFit: "cover",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#f1f5f9",
  },

  skuText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  actionLink: {
    display: "inline-block",
    marginRight: 14,
    fontSize: 13,
    fontWeight: 600,
    color: "#2563eb",
    textDecoration: "none",
    cursor: "pointer",
    transition: ".2s",
  },
};
