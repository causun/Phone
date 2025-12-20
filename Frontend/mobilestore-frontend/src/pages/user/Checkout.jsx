import { useState, useEffect, useContext, useMemo } from "react";

import Select from "react-select";
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from "sub-vn";

import { CartContext } from "../../context/CartContext";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, Truck, CreditCard, MapPin, 
  ChevronLeft, CheckCircle2, ShieldCheck 
} from "lucide-react";
import UserHeader from "../../components/UserHeader";
import UserFooter from "../../components/UserFooter";
import "./styles/checkout.css"; 

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [info, setInfo] = useState({ 
    fullName: "", 
    phone: "", 
    province: "", 
    district: "", 
    ward: "", 
    detailAddress: "" 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }

    // Tách địa chỉ từ chuỗi "Số nhà, Xã, Huyện, Tỉnh"
    const addrParts = user.address ? user.address.split(", ") : [];
    setInfo({
      fullName: user.name || "",
      phone: user.phone || "",
      province: addrParts[addrParts.length - 1] || "",
      district: addrParts[addrParts.length - 2] || "",
      ward: addrParts[addrParts.length - 3] || "",
      detailAddress: addrParts.slice(0, addrParts.length - 3).join(", ") || ""
    });
  }, []);

  // ===== LOGIC ĐỊA CHỈ GIỐNG PROFILE =====
  const provinceOptions = useMemo(() => 
    getProvinces().map(p => ({ value: p.code, label: p.name })), []
  );

  const districtOptions = useMemo(() => {
    if (!info.province) return [];
    const p = getProvinces().find(i => i.name === info.province);
    return p ? getDistrictsByProvinceCode(p.code).map(d => ({ value: d.code, label: d.name })) : [];
  }, [info.province]);

  const wardOptions = useMemo(() => {
    if (!info.district) return [];
    const p = getProvinces().find(i => i.name === info.province);
    if (!p) return [];
    const d = getDistrictsByProvinceCode(p.code).find(i => i.name === info.district);
    return d ? getWardsByDistrictCode(d.code).map(w => ({ value: w.code, label: w.name })) : [];
  }, [info.province, info.district]);

  const handleSelectChange = (selectedOption, fieldName) => {
    const value = selectedOption ? selectedOption.label : "";
    setInfo(prev => {
      const next = { ...prev, [fieldName]: value };
      if (fieldName === "province") { next.district = ""; next.ward = ""; }
      if (fieldName === "district") { next.ward = ""; }
      return next;
    });
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    // Kiểm tra đầy đủ 4 trường địa chỉ
    if (!info.fullName || !info.phone || !info.province || !info.district || !info.ward || !info.detailAddress) {
      alert("Vui lòng điền đầy đủ thông tin nhận hàng.");
      return;
    }

    if (cart.length === 0) { alert("Giỏ hàng của bạn đang trống."); return; }

    // Gộp địa chỉ thành chuỗi để gửi lên server
    const fullAddress = `${info.detailAddress}, ${info.ward}, ${info.district}, ${info.province}`;

    const order = {
      userId: user.id,
      fullName: info.fullName,
      phone: info.phone,
      address: fullAddress,
      items: cart.map((i) => ({
        productId: Number(i.id),
        productName: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity || 1
      }))
    };

    try {
      setLoading(true);
      await axios.post("/orders/create", order);
      alert("Đặt hàng thành công!"); 
      clearCart();
      navigate("/user/orders");
    } catch (err) {
      alert("Có lỗi xảy ra khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  // Style cho Select giống Profile
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '12px',
      borderColor: '#e2e8f0',
      minHeight: '48px',
      fontSize: '0.95rem',
      boxShadow: 'none',
      '&:hover': { borderColor: '#2563eb' }
    })
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const total = subtotal;

  return (
    <div className="checkout-page">
      <UserHeader />
      <main className="checkout-container">
        {/* ... Header giữ nguyên ... */}
        <div className="checkout-grid">
          <div className="checkout-left">
            <section className="checkout-section">
              <div className="section-title">
                <MapPin size={22} className="icon-blue" />
                <h2>Thông tin nhận hàng</h2>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Họ tên người nhận</label>
                  <input name="fullName" value={info.fullName} onChange={handleChange} placeholder="Nguyễn Văn A" />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input name="phone" value={info.phone} onChange={handleChange} placeholder="0901xxxxxx" />
                </div>

                {/* PHẦN ĐỊA CHỈ MỚI */}
                <div className="form-group full-width">
                  <label>Tỉnh/Thành phố</label>
                  <Select
                    options={provinceOptions}
                    value={provinceOptions.find(o => o.label === info.province) || null}
                    onChange={(opt) => handleSelectChange(opt, "province")}
                    styles={selectStyles}
                    placeholder="Chọn Tỉnh/Thành"
                  />
                </div>
                <div className="form-group">
                  <label>Quận/Huyện</label>
                  <Select
                    options={districtOptions}
                    value={districtOptions.find(o => o.label === info.district) || null}
                    onChange={(opt) => handleSelectChange(opt, "district")}
                    isDisabled={!info.province}
                    styles={selectStyles}
                    placeholder="Chọn Quận/Huyện"
                  />
                </div>
                <div className="form-group">
                  <label>Phường/Xã</label>
                  <Select
                    options={wardOptions}
                    value={wardOptions.find(o => o.label === info.ward) || null}
                    onChange={(opt) => handleSelectChange(opt, "ward")}
                    isDisabled={!info.district}
                    styles={selectStyles}
                    placeholder="Chọn Phường/Xã"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Địa chỉ chi tiết</label>
                  <input 
                    name="detailAddress" 
                    value={info.detailAddress} 
                    onChange={handleChange} 
                    placeholder="Số nhà, tên đường..." 
                  />
                </div>
              </div>
            </section>
            {/* ... Payment section giữ nguyên ... */}
            <section className="checkout-section">
              <div className="section-title">
                <CreditCard size={22} className="icon-blue" />
                <h2>Phương thức thanh toán</h2>
              </div>
              <div className="payment-method-card active">
                <CheckCircle2 size={20} className="check-icon" />
                <div className="payment-text">
                  <span className="payment-name">Thanh toán khi nhận hàng (COD)</span>
                  <p className="payment-desc">Kiểm tra hàng trước khi thanh toán tiền mặt</p>
                </div>
              </div>
            </section>
          </div>

          {/* CỘT PHẢI: TỔNG ĐƠN HÀNG */}
          <aside className="checkout-right">
            <div className="order-summary-card">
              <div className="section-title">
                <ShoppingBag size={22} className="icon-blue" />
                <h2>Đơn hàng của bạn</h2>
              </div>

              <div className="checkout-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <div className="item-img-wrapper">
                      <img src={item.image?.startsWith("http") ? item.image : `http://localhost:8081/uploads/products/${item.image}`} alt={item.name} />
                      <span className="item-qty">{item.quantity}</span>
                    </div>
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">{item.price.toLocaleString()}₫</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Tạm tính</span>
                  <span>{subtotal.toLocaleString()}₫</span>
                </div>
                <div className="price-row">
                  <span>Phí vận chuyển</span>
                  <span className="free-tag">Miễn phí</span>
                </div>
                <div className="price-row total">
                  <span>Tổng thanh toán</span>
                  <span className="final-price">{total.toLocaleString()}₫</span>
                </div>
              </div>

              <div className="trust-badges">
                <div className="badge"><ShieldCheck size={14} /> Chính hãng 100%</div>
                <div className="badge"><Truck size={14} /> Giao hỏa tốc 2h</div>
              </div>

              <div className="action-buttons">
                <button onClick={submit} disabled={loading || cart.length === 0} className="btn-confirm">
                  {loading ? "Đang xử lý..." : "XÁC NHẬN ĐẶT HÀNG"}
                </button>
                <button onClick={() => navigate("/user/cart")} className="btn-back">
                  <ChevronLeft size={18} /> Quay lại giỏ hàng
                </button>
              </div>
            </div>
          </aside>           
        </div>
      </main>
      <UserFooter />
    </div>
  );
}