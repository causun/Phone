import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { Button } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import "./product.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(console.error);

    axios.get("/categories")
      .then(res => setCategories(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleUpdate = async () => {
    const productObj = {
      name: product.name,
      description: product.description,
      price: Number(product.price),
      discountPrice: Number(product.discountPrice),
      stock: Number(product.stock),
      category: { id: Number(product.category.id) },
      active: product.active
    };

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(productObj)], { type: "application/json" }));
    if (mainImage) formData.append("image", mainImage);

    try {
      await axios.put(`/products/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật sản phẩm!");
    }
  };

  return (
    <div className="product-add-container">
      <h2>Sửa Sản phẩm</h2>

      <div className="form-group">
        <label>Category:</label>
        <select
          value={product.category?.id}
          onChange={e => setProduct({ ...product, category: { id: e.target.value } })}
        >
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
      </div>

      <div className="form-group">
        <label>Mô tả:</label>
        <RichTextEditor
          value={product.description}
          onChange={value => setProduct({ ...product, description: value })}
          style={{ minHeight: 200, marginBottom: 20 }}
        />
      </div>

      <div className="form-group">
        <label>Main Image:</label>
        <input type="file" accept="image/*" onChange={e => setMainImage(e.target.files[0])} />
        {product.image && typeof product.image === "string" && (
          <img
            src={`http://localhost:8081/uploads/products/${product.image}`}
            alt={product.name}
            className="product-img"
          />
        )}
      </div>

      <div className="form-group">
        <label>Giá gốc:</label>
        <input type="number" value={product.discountPrice} onChange={e => setProduct({ ...product, discountPrice: Number(e.target.value) })} />
      </div>

      <div className="form-group">
        <label>Giá bán:</label>
        <input type="number" value={product.price} onChange={e => setProduct({ ...product, price: Number(e.target.value) })} />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input type="number" value={product.stock} onChange={e => setProduct({ ...product, stock: Number(e.target.value) })} />
      </div>

      <div className="form-actions">
        <Button color="green" onClick={handleUpdate}>Lưu thay đổi</Button>
        <Button color="gray" onClick={() => navigate("/admin/products")} style={{ marginLeft: 10 }}>Hủy</Button>
      </div>
    </div>
  );
}

export default EditProduct;
