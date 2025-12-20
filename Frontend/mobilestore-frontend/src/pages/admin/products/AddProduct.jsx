import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { Button } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import "./product.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceOriginal, setPriceOriginal] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const [stock, setStock] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/categories")
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  const handleAdd = async () => {
    if (!name || !categoryId) {
      alert("Name và Category là bắt buộc");
      return;
    }

    const productObj = {
      name,
      description,
      price: Number(priceSale),
      discountPrice: Number(priceOriginal),
      stock: Number(stock),
      category: { id: Number(categoryId) },
      status: "OPEN"   // ✅ KHỚP BACKEND
    };

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(productObj)], { type: "application/json" }));
    if (mainImage) formData.append("image", mainImage);

    try {
      await axios.post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Thêm sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Lỗi thêm sản phẩm!");
    }
  };

  return (
    <div className="product-add-container">
      <h2>Thêm Sản phẩm</h2>

      <div className="form-group">
        <label>Category:</label>
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <option value="">Chọn Category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên sản phẩm..." />
      </div>

      <div className="form-group">
        <label>Mô tả:</label>
        <RichTextEditor
          value={description}
          onChange={setDescription}
          style={{ minHeight: 200, marginBottom: 20 }}
        />
      </div>

      <div className="form-group">
        <label>Main Image:</label>
        <input type="file" accept="image/*" onChange={e => setMainImage(e.target.files[0])} />
      </div>

      <div className="form-group">
        <label>Giá gốc:</label>
        <input type="number" value={priceOriginal} onChange={e => setPriceOriginal(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Giá bán:</label>
        <input type="number" value={priceSale} onChange={e => setPriceSale(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} />
      </div>

      <div className="form-actions">
        <Button color="green" onClick={handleAdd}>Thêm sản phẩm</Button>
        <Button color="gray" onClick={() => navigate("/admin/products")} style={{ marginLeft: 10 }}>Hủy</Button>
      </div>
    </div>
  );
}

export default AddProduct;
