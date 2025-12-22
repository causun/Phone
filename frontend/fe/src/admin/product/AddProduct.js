import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "../page/AdminHeader";
import { Upload, X } from "lucide-react";
import "../../css/admin/product/AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  const [form, setForm] = useState({
    name: "",
    brandId: "",
    price: "",
    quantityInStock: "",
    screenSize: "",
    ram: "",
    storage: "",
    chipset: "",
    camera: "",
    battery: "",
    os: "",
    color: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  /* ===== LOAD BRANDS ===== */
  useEffect(() => {
    adminAxios
      .get("/brands")
      .then((res) => setBrands(res.data))
      .catch(() => setBrands([]));
  }, []);

  /* ===== HANDLERS ===== */
const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brandId" && value === "ADD_NEW") {
      setShowBrandModal(true);
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    try {
      const res = await adminAxios.post("/brands", { name: newBrandName });
      setBrands([...brands, res.data]);
      setForm((prev) => ({ ...prev, brandId: res.data.id }));
      setShowBrandModal(false);
      setNewBrandName("");
    } catch (err) {
      alert("❌ Lỗi khi thêm thương hiệu");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (i) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setPreview((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* ===== SUBMIT (GIỮ NGUYÊN THUẬT TOÁN) ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // ⚠️ ÉP KIỂU – CỰC KỲ QUAN TRỌNG
    data.append("name", form.name);
    data.append("brandId", Number(form.brandId));
    data.append("price", Number(form.price));
    data.append("quantityInStock", Number(form.quantityInStock));

    data.append("screenSize", form.screenSize || "");
    data.append("ram", form.ram || "");
    data.append("storage", form.storage || "");
    data.append("chipset", form.chipset || "");
    data.append("camera", form.camera || "");
    data.append("battery", form.battery || "");
    data.append("os", form.os || "");
    data.append("color", form.color || "");
    data.append("description", form.description || "");

    images.forEach((img) => data.append("images", img));

    // 🔍 DEBUG (CÓ THỂ GIỮ)
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await adminAxios.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Thêm sản phẩm thành công");
      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Lỗi khi thêm sản phẩm");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="ap-wrapper">
        <h2 className="ap-title">➕ Thêm sản phẩm mới</h2>

        <form className="ap-form" onSubmit={handleSubmit}>
          {/* LEFT */}
          <div className="ap-col">
            <div className="ap-card">
              <h3>Thông tin cơ bản</h3>

              <input
                name="name"
                placeholder="Tên sản phẩm"
                value={form.name}
                onChange={handleChange}
                required
              />

              <select name="brandId" value={form.brandId} onChange={handleChange} required>
                <option value="">-- Chọn thương hiệu --</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
                {/* Thêm dòng này */}
                <option value="ADD_NEW" style={{fontWeight: 'bold', color: '#2563eb'}}>+ Thêm thương hiệu mới...</option>
              </select>

              <input
                name="color"
                placeholder="Màu sắc"
                value={form.color}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Mô tả sản phẩm"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="ap-card">
              <h3>Thông số kỹ thuật</h3>

              {[
                "screenSize",
                "ram",
                "storage",
                "chipset",
                "camera",
                "battery",
                "os",
              ].map((item) => (
                <input
                  key={item}
                  name={item}
                  placeholder={item}
                  value={form[item]}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="ap-col small">
            <div className="ap-card">
              <h3>Giá & Kho</h3>

              <input
                type="number"
                name="price"
                placeholder="Giá"
                value={form.price}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="quantityInStock"
                placeholder="Số lượng tồn"
                value={form.quantityInStock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ap-card">
              <h3>Ảnh sản phẩm</h3>

              <label className="upload-btn">
                <Upload size={18} />
                Chọn ảnh
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </label>

              <div className="preview-grid">
                {preview.map((img, i) => (
                  <div key={i} className="preview-item">
                    <img src={img} alt="" />
                    <button type="button" onClick={() => removeImage(i)}>
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="submit-btn">💾 Lưu sản phẩm</button>
          </div>
        </form>
      </div>

{/* MODAL THÊM THƯƠNG HIỆU NHANH */}
      {showBrandModal && (
        <div className="brand-modal-overlay">
          <div className="brand-modal">
            <div className="modal-header">
              <h3>Thêm thương hiệu mới</h3>
              <button type="button" onClick={() => setShowBrandModal(false)}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <input 
                type="text" 
                placeholder="Nhập tên thương hiệu (VD: Apple, Samsung...)" 
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowBrandModal(false)}>Hủy</button>
              <button type="button" className="btn-save" onClick={handleAddBrand}>Lưu thương hiệu</button>
            </div>
          </div>
        </div>
      )}

    </>


  );
}
