"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ArrowLeft } from "lucide-react"; // Cần cài lucide-react hoặc dùng icon khác
import axios from "../../api/axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from "sub-vn";
import "./styles/profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    birthday: "",
    province: "",
    district: "",
    ward: "",
    detailAddress: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setUser(storedUser);
      
      // Logic tách địa chỉ: "Số nhà, Xã, Huyện, Tỉnh"
      const addrParts = storedUser.address ? storedUser.address.split(", ") : [];
      // Đảo ngược hoặc lấy từ cuối lên để đảm bảo độ chính xác
      setForm({
        name: storedUser.name || "",
        phone: storedUser.phone || "",
        birthday: storedUser.birthday || "",
        province: addrParts[addrParts.length - 1] || "",
        district: addrParts[addrParts.length - 2] || "",
        ward: addrParts[addrParts.length - 3] || "",
        detailAddress: addrParts.slice(0, addrParts.length - 3).join(", ") || ""
      });
    }
  }, []);

  /* ===== ADDRESS LOGIC ===== */
  const provinceOptions = useMemo(() => 
    getProvinces().map(p => ({ value: p.code, label: p.name })), []
  );

  const districtOptions = useMemo(() => {
    if (!form.province) return [];
    const p = getProvinces().find(i => i.name === form.province);
    return p ? getDistrictsByProvinceCode(p.code).map(d => ({ value: d.code, label: d.name })) : [];
  }, [form.province]);

  const wardOptions = useMemo(() => {
    if (!form.district) return [];
    const p = getProvinces().find(i => i.name === form.province);
    if (!p) return [];
    const d = getDistrictsByProvinceCode(p.code).find(i => i.name === form.district);
    return d ? getWardsByDistrictCode(d.code).map(w => ({ value: w.code, label: w.name })) : [];
  }, [form.province, form.district]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption ? selectedOption.label : "";
    setForm(prev => {
      const next = { ...prev, [fieldName]: value };
      if (fieldName === "province") { next.district = ""; next.ward = ""; }
      if (fieldName === "district") { next.ward = ""; }
      return next;
    });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

const handleSave = async () => {
  setIsLoading(true);
  try {
    const fullAddress = `${form.detailAddress}, ${form.ward}, ${form.district}, ${form.province}`;
    const formData = new FormData();
    
    // Gửi dữ liệu khớp với @RequestPart ở Backend
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("birthday", form.birthday);
    formData.append("address", fullAddress);
    
    if (avatar) {
      formData.append("avatar", avatar);
    }

    // Gọi API cập nhật
    const res = await axios.put(`/auth/user/${user.id}/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    if (res.data.success) {
      alert("Cập nhật thông tin thành công!");
      
      // 1. Lấy dữ liệu user mới từ server trả về
      const updatedUserFromBackend = res.data.data; 
      
      // 2. Lưu vào localStorage để các trang khác (Header) cập nhật theo
      localStorage.setItem("user", JSON.stringify(updatedUserFromBackend));
      
      // 3. Cập nhật state hiện tại
      setUser(updatedUserFromBackend);
      
      // 4. CHUYỂN HƯỚNG VỀ TRANG CHỦ
      navigate("/user/home"); 
      
      // Tùy chọn: Nếu Header của bạn không tự load lại ảnh, có thể dùng:
      // window.location.href = "/";
    } else {
      alert(res.data.message || "Cập nhật thất bại!");
    }
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    alert("Không thể kết nối đến máy chủ!");
  } finally {
    setIsLoading(false);
  }
};

  const selectStyles = {
    control: (base) => ({
      ...base,
      marginBottom: '10px',
      borderRadius: '8px',
      borderColor: '#e0e0e0',
      minHeight: '45px'
    })
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="card-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="title">Thông tin cá nhân</h2>
          <div style={{ width: 20 }}></div> {/* Spacer để cân bằng title */}
        </div>

        {/* PHẦN AVATAR - CHỈ GIỮ 1 NÚT TRIGGER */}
<div className="avatar-section">
  <div className="avatar-preview-box">
    {avatar ? (
      <img src={URL.createObjectURL(avatar)} alt="avatar" className="avatar-img" />
    ) : user.avatar ? (
      <img src={`http://localhost:8081/uploads/avatars/${user.avatar}`} alt="avatar" className="avatar-img" />
    ) : (
      <div className="avatar-placeholder">{user.name?.charAt(0)}</div>
    )}
  </div>
  
  {/* Label bao quanh input file để khi click vào chữ là chọn được ảnh luôn */}
  <label className="avatar-label">
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleAvatarChange} 
    />
    Thay đổi ảnh đại diện
  </label>
</div>

{/* PHẦN FORM - SỬ DỤNG COMPONENT INPUT ĐỒNG BỘ */}
<div className="form-section">
  <div className="form-grid">
    <div className="form-group">
      <label>Họ tên</label>
      <Input name="name" value={form.name} onChange={handleChange} />
    </div>
    <div className="form-group">
      <label>Số điện thoại</label>
      <Input name="phone" value={form.phone} onChange={handleChange} />
    </div>
  </div>

  {/* Hàng 2: Email (Chiếm toàn bộ chiều ngang giống dòng địa chỉ cụ thể) */}
  <div className="form-group email-readonly-group">
    <label>Email</label>
    <Input 
      value={user?.email || ""} 
      readOnly 
      className="input-readonly"
      placeholder="Chưa cập nhật email"
    />
  </div>

  {/* Phần Ngày sinh (giữ nguyên của bạn) */}
  <div className="form-group">
    <label>Ngày sinh</label>
    <Input type="date" name="birthday" value={form.birthday} onChange={handleChange} />
  </div>

  <div className="address-section">
    <label>Địa chỉ</label>
    <Select
      placeholder="Chọn Tỉnh/Thành..."
      options={provinceOptions}
      value={provinceOptions.find(o => o.label === form.province) || null}
      onChange={(opt) => handleSelectChange(opt, "province")}
      styles={selectStyles}
    />
    <div className="form-grid">
      <Select
        placeholder="Chọn Quận/Huyện..."
        options={districtOptions}
        value={districtOptions.find(o => o.label === form.district) || null}
        onChange={(opt) => handleSelectChange(opt, "district")}
        isDisabled={!form.province}
        styles={selectStyles}
      />
      <Select
        placeholder="Chọn Phường/Xã..."
        options={wardOptions}
        value={wardOptions.find(o => o.label === form.ward) || null}
        onChange={(opt) => handleSelectChange(opt, "ward")}
        isDisabled={!form.district}
        styles={selectStyles}
      />
    </div>
    
    {/* Thay thẻ input thường bằng component Input của bạn để đồng bộ giao diện */}
    <div className="form-group">
    <Input 
      name="detailAddress" 
      placeholder="Số nhà, tên đường..." 
      value={form.detailAddress} 
      onChange={handleChange} 
    />
  </div>
  </div>
</div>

        <Button onClick={handleSave} className="save-btn" disabled={isLoading}>
          {isLoading ? "Đang lưu..." : "Cập nhật tài khoản"}
        </Button>
      </div>
    </div>
  );
}