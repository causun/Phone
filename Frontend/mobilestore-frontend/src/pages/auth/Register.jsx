import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./auth.css";

// Import thư viện địa giới
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from "sub-vn";

function Register() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", birthday: "",
    province: "", district: "", ward: "", detailAddress: ""
  });

  /* ===== DATA LOGIC (Sửa để hoạt động ổn định hơn) ===== */
  const provinceOptions = useMemo(() => 
    getProvinces().map(p => ({ value: p.code, label: p.name })), []
  );

  // Lấy danh sách Huyện dựa trên tên Tỉnh trong state
  const districtOptions = useMemo(() => {
    if (!form.province) return [];
    const p = getProvinces().find(i => i.name === form.province);
    return p ? getDistrictsByProvinceCode(p.code).map(d => ({ value: d.code, label: d.name })) : [];
  }, [form.province]);

  // Lấy danh sách Xã dựa trên tên Huyện trong state
  const wardOptions = useMemo(() => {
    if (!form.district) return [];
    // Cần tìm lại mã tỉnh trước để tìm huyện chính xác
    const p = getProvinces().find(i => i.name === form.province);
    if (!p) return [];
    const d = getDistrictsByProvinceCode(p.code).find(i => i.name === form.district);
    return d ? getWardsByDistrictCode(d.code).map(w => ({ value: w.code, label: w.name })) : [];
  }, [form.province, form.district]);

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption ? selectedOption.label : "";
    setForm(prev => {
      const next = { ...prev, [fieldName]: value };
      if (fieldName === "province") { next.district = ""; next.ward = ""; }
      if (fieldName === "district") { next.ward = ""; }
      return next;
    });
    setErrors(prev => ({ ...prev, [fieldName]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Họ tên không được để trống";
    if (!form.email.trim()) newErrors.email = "Email không được để trống";
    if (!form.password) newErrors.password = "Mật khẩu không được để trống";
    if (!form.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
    if (!form.birthday) newErrors.birthday = "Ngày sinh không được để trống";
    if (!form.province) newErrors.province = "Vui lòng chọn Tỉnh/Thành";
    if (!form.district) newErrors.district = "Vui lòng chọn Quận/Huyện";
    if (!form.ward) newErrors.ward = "Vui lòng chọn Phường/Xã";
    if (!form.detailAddress.trim()) newErrors.detailAddress = "Vui lòng nhập địa chỉ chi tiết";
    if (!avatar) newErrors.avatar = "Vui lòng chọn ảnh đại diện";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
        alert("Vui lòng điền đầy đủ tất cả các trường thông tin!");
        return;
    }

    setIsLoading(true);

    try {
      const address = `${form.detailAddress}, ${form.ward}, ${form.district}, ${form.province}`;
      const payload = { ...form, address };

      const formData = new FormData();
      formData.append("data", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      if (avatar) formData.append("avatar", avatar);

      await axios.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate(`/verify-otp?email=${form.email}`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "";
      if (errorMsg.includes("Email đã tồn tại") || err.response?.status === 409) {
        alert("email đã được đăng ký");
      } else {
        alert(errorMsg || "Lỗi đăng ký, vui lòng thử lại");
      }
      setIsLoading(false);
    }
  };

  // Styles cho React-Select
  const selectStyles = (hasError) => ({
    control: (base) => ({
      ...base,
      marginBottom: '10px',
      borderRadius: '8px',
      borderColor: hasError ? 'red' : '#ccc',
    }),
    menu: (base) => ({ ...base, zIndex: 9999 }) // Đảm bảo danh sách hiện lên trên các input khác
  });

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <Input name="name" placeholder="Họ tên" onChange={handleChange} />
      {errors.name && <span className="error-text">{errors.name}</span>}

      <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
      {errors.email && <span className="error-text">{errors.email}</span>}

      <Input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} />
      {errors.password && <span className="error-text">{errors.password}</span>}

      <Input name="phone" placeholder="Số điện thoại" onChange={handleChange} />
      {errors.phone && <span className="error-text">{errors.phone}</span>}

      <Input name="birthday" type="date" onChange={handleChange} />
      {errors.birthday && <span className="error-text">{errors.birthday}</span>}

      <div className="avatar-box">
        <label>Avatar:</label>
        <input type="file" accept="image/*" onChange={(e) => {
            setAvatar(e.target.files[0]);
            setErrors({...errors, avatar: ""});
        }} />
        {errors.avatar && <span className="error-text">{errors.avatar}</span>}
      </div>

      <div className="address-group" style={{ marginTop: '15px' }}>
        <Select
          placeholder="Chọn Tỉnh/Thành..."
          options={provinceOptions}
          value={provinceOptions.find(o => o.label === form.province) || null}
          onChange={(opt) => handleSelectChange(opt, "province")}
          styles={selectStyles(errors.province)}
        />
        
        <Select
          placeholder="Chọn Quận/Huyện..."
          options={districtOptions}
          value={districtOptions.find(o => o.label === form.district) || null}
          onChange={(opt) => handleSelectChange(opt, "district")}
          isDisabled={!form.province}
          styles={selectStyles(errors.district)}
        />

        <Select
          placeholder="Chọn Phường/Xã..."
          options={wardOptions}
          value={wardOptions.find(o => o.label === form.ward) || null}
          onChange={(opt) => handleSelectChange(opt, "ward")}
          isDisabled={!form.district}
          styles={selectStyles(errors.ward)}
        />
      </div>

      <Input name="detailAddress" placeholder="Số nhà, tên đường..." onChange={handleChange} />
      {errors.detailAddress && <span className="error-text">{errors.detailAddress}</span>}
      
      <Button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? "Đang xử lý..." : "Đăng ký ngay"}
      </Button>
    </div>
  );
}

export default Register;