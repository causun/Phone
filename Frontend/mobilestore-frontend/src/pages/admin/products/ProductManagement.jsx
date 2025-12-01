import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Button from "../../../components/Button";
import "./product.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Load products
  const loadProducts = () => {
    axios
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  // Load categories
  const loadCategories = () => {
    axios
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // Search or Filter
  const handleSearch = () => {
    axios
      .get("/products/search", {
        params: {
          name: search || undefined,
          categoryId: categoryId || undefined,
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  // Toggle product status
  const toggleStatus = async (id) => {
    try {
      await axios.patch(`/products/toggle/${id}`);
      loadProducts();
    } catch (e) {
      console.error(e);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;

    try {
      await axios.delete(`/products/${id}`);
      loadProducts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="product-container">

      {/* Header */}
      <div className="product-header">
        <h2>Product Management</h2>

        <div className="action-row">
          <Button onClick={() => (window.location.href = "/admin/products/add")}>
            Add Product
          </Button>

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />

          <select
            className="category-filter"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <Button onClick={handleSearch}>Filter</Button>
        </div>
      </div>

      {/* Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Main Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>

              <td>
                {p.mainImage ? (
                  <img
                    src={`http://localhost:8081${p.mainImage}`}
                    className="product-img"
                    alt="img"
                  />
                ) : (
                  "—"
                )}
              </td>

              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category ? p.category.name : "—"}</td>

              <td className={p.active ? "status-active" : "status-inactive"}>
                {p.active ? "Active" : "Inactive"}
              </td>

              <td className="action-buttons">
                <Button
                  onClick={() =>
                    (window.location.href = `/admin/products/edit/${p.id}`)
                  }
                >
                  Edit
                </Button>

                <Button onClick={() => toggleStatus(p.id)}>
                  {p.active ? "Disable" : "Enable"}
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

    </div>
  );
}

export default ProductManagement;
