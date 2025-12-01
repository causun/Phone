import React, { useEffect, useState } from "react";
import axios from "../../../api/axios"; // instance axios
import Button from "../../../components/Button";
import "./product.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // Load categories từ backend
  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  // Xử lý ảnh chính
  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  // Xử lý ảnh phụ (max 3)
  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setSubImages(files);
  };

  // Thêm sản phẩm
  const handleAdd = async () => {
    if (!name || !categoryId) {
      alert("Name và Category là bắt buộc");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", Number(price));
    formData.append("stock", Number(stock));
    formData.append("categoryId", Number(categoryId));
    formData.append("active", true);

    if (mainImage) formData.append("mainImage", mainImage);
    subImages.forEach((file) => formData.append("subImages", file));

    try {
      const res = await axios.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // quan trọng
        },
      });

      console.log("Server response:", res.data);
      alert("Added successfully!");
      window.location.href = "/admin/products";
    } catch (err) {
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Status:", err.response.status);
        alert("Error adding product! See console for details.");
      } else if (err.request) {
        console.error("No response received:", err.request);
        alert("No response from server. Check backend.");
      } else {
        console.error("Request error:", err.message);
        alert("Request setup error. See console.");
      }
    }
  };

  return (
    <div className="product-container">
      <h2>Add Product</h2>

      <div className="form-group">
        <label>Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Main Image:</label>
        <input type="file" accept="image/*" onChange={handleMainImageChange} />
      </div>

      <div className="form-group">
        <label>Additional Images (max 3):</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleSubImagesChange}
        />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <Button onClick={handleAdd}>Add Product</Button>
    </div>
  );
}

export default AddProduct;
