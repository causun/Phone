import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "../page/AdminHeader";
import { Upload, X } from "lucide-react";
import "../../css/admin/product/EditProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
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
    status: "ACTIVE",
    brandId: "",
  });

  const [brands, setBrands] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [preview, setPreview] = useState([]);

  /* ================= LOAD DATA (GIỮ NGUYÊN THUẬT TOÁN) ================= */
  useEffect(() => {
    Promise.all([
      // ADMIN: lấy toàn bộ brand
      adminAxios.get("/brands?admin=true"),
      adminAxios.get(`/products/${id}`),
    ])
      .then(([brandRes, productRes]) => {
        const brandList = brandRes.data || [];
        const p = productRes.data?.data || productRes.data;

        setBrands(brandList);
        setOldImages(p.imageUrls || []);

        setForm({
          name: p.name || "",
          price: p.price || "",
          quantityInStock: p.quantityInStock || "",
          screenSize: p.screenSize || "",
          ram: p.ram || "",
          storage: p.storage || "",
          chipset: p.chipset || "",
          camera: p.camera || "",
          battery: p.battery || "",
          os: p.os || "",
          color: p.color || "",
          description: p.description || "",
          status: p.status || "ACTIVE",
          brandId:
            p.brand?.id != null ? String(p.brand.id) : "",
        });
      })
      .catch((err) => {
        console.error("Load product error:", err.response?.data);
        // 401 → interceptor tự xử lý
      });
  }, [id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE ================= */
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    setPreview((prev) =>
      prev.concat(files.map((f) => URL.createObjectURL(f)))
    );
  };

  const removeNewImage = (i) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== i));
    setPreview((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    newImages.forEach((img) => data.append("images", img));

    try {
      await adminAxios.put(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Cập nhật sản phẩm thành công");
      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Lỗi khi cập nhật sản phẩm");
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <AdminHeader />

      <div className="ep-wrapper">
        <h2 className="ep-title">✏️ Cập nhật sản phẩm</h2>

        <form className="ep-form" onSubmit={handleSubmit}>
          {/* LEFT */}
          <div className="ep-col">
            <div className="ep-card">
              <h3>Thông tin cơ bản</h3>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                required
              />

              <select
                name="brandId"
                value={String(form.brandId || "")}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn thương hiệu --</option>
                {brands.map((b) => (
                  <option key={b.id} value={String(b.id)}>
                    {b.name}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Mô tả sản phẩm"
              />
            </div>

            <div className="ep-card">
              <h3>Thông số kỹ thuật</h3>
              {[
                "screenSize",
                "ram",
                "storage",
                "chipset",
                "camera",
                "battery",
                "os",
                "color",
              ].map((f) => (
                <input
                  key={f}
                  name={f}
                  value={form[f]}
                  onChange={handleChange}
                  placeholder={f}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="ep-col small">
            <div className="ep-card">
              <h3>Giá & Kho</h3>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Giá"
                required
              />

              <input
                type="number"
                name="quantityInStock"
                value={form.quantityInStock}
                onChange={handleChange}
                placeholder="Số lượng tồn"
                required
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            <div className="ep-card">
              <h3>Ảnh hiện tại</h3>
              <div className="ep-image-grid">
                {oldImages.map((url, i) => (
                  <img key={i} src={url} alt="" />
                ))}
              </div>
            </div>

            <div className="ep-card">
              <h3>Thêm ảnh mới</h3>

              <label className="ep-upload">
                <Upload size={18} />
                Chọn ảnh
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleAddImages}
                />
              </label>

              <div className="ep-image-grid">
                {preview.map((img, i) => (
                  <div key={i} className="ep-preview">
                    <img src={img} alt="" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(i)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="ep-submit">💾 Cập nhật</button>
          </div>
        </form>
      </div>
    </>
  );
}
