import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./product.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`/products/${id}`).then(res => setProduct(res.data));
    axios.get("/categories").then(res => setCategories(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleUpdate = async () => {
    const payload = {
      ...product,
      subImages: product.subImages.map(s => s.trim())
    };

    try {
      await axios.put(`/products/${id}`, payload);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra. Kiểm tra console.");
    }
  };

  return (
    <div className="product-add-edit-container">
      <h2 className="product-add-edit-header">Chỉnh sửa Sản phẩm</h2>

      <div className="product-add-edit-form">
        <div className="form-group">
          <label>Tên sản phẩm</label>
          <input
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Main Image URL</label>
          <input
            value={product.mainImage}
            onChange={e => setProduct({ ...product, mainImage: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Sub Images (ngăn cách bằng dấu ,)</label>
          <input
            value={product.subImages.join(", ")}
            onChange={e =>
              setProduct({ ...product, subImages: e.target.value.split(",") })
            }
          />
        </div>

        <div className="form-group">
          <label>Giá</label>
          <input
            type="number"
            value={product.price}
            onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            value={product.stock}
            onChange={e => setProduct({ ...product, stock: Number(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <label>Danh mục</label>
          <select
            value={product.category?.id}
            onChange={e => setProduct({ ...product, category: { id: e.target.value } })}
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <Button onClick={handleUpdate}>Lưu thay đổi</Button>
          <Button onClick={() => navigate("/admin/products")} style={{ background: "#6c757d" }}>
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
