import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Button from "../../../components/Button";
import "./product.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Load products (pagination + search)
  const loadProducts = async () => {
    try {
      const res = await axios.get("/products", {
        params: {
          page,
          size: 10,
          search: search || null
        }
      });

      setProducts(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  // Toggle status (open / close)
  const toggleStatus = async (id) => {
    try {
      await axios.patch(`/products/${id}/toggle-status`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error toggling status!");
    }
  };

  // Delete
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await axios.delete(`/products/delete/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error deleting product!");
    }
  };

  // Format price VNĐ
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);

  return (
    <div className="product-container">
      <div className="product-header">
        <h2>Product Management</h2>

        <div className="action-row">
          <input
            className="search-box"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => {
              setPage(0);
              setSearch(e.target.value);
            }}
          />

          <Button onClick={() => (window.location.href = "/admin/products/add")}>
            Add Product
          </Button>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Main Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sold</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                No products found
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr key={p.id}>
              <td className="product-name">
                {p.name}
                <div className="product-sku">
                  SKU: {p.sku}
                </div>
              </td>

              <td>
                {p.image ? (
                  <img
                    src={`http://localhost:8081/uploads/products/${p.image}`}
                    alt={p.name}
                    className="product-img"
                  />
                ) : "—"}
              </td>

              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>{p.soldQuantity || 0}</td>

              <td
                className={
                  p.status === "OPEN" ? "status-active" : "status-inactive"
                }
                style={{ cursor: "pointer" }}
                title="Click to change status"
                onClick={() => {
                  const nextStatus =
                    p.status === "OPEN" ? "CLOSED" : "OPEN";

                  const ok = window.confirm(
                    `Bạn có chắc muốn chuyển sản phẩm này sang trạng thái ${nextStatus} không?`
                  );

                  if (ok) {
                    toggleStatus(p.id);
                  }
                }}
              >
                {p.status}
              </td>


              <td className="action-buttons">
                <Button
                  onClick={() =>
                    (window.location.href = `/admin/products/edit/${p.id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  onClick={() => deleteProduct(p.id)}
                  style={{ background: "red" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Prev
          </Button>

          <span style={{ alignSelf: "center" }}>
            Page {page + 1} / {totalPages}
          </span>

          <Button
            onClick={() => setPage(page + 1)}
            disabled={page + 1 >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
