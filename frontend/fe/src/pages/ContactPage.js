import React, { useState } from "react";
import axios from "axios"; // Sử dụng axios trực tiếp như ProductPage
import { 
  Phone, Mail, MapPin, ShieldCheck, Award, Truck, 
  Users, Store, Globe, CheckCircle2, Calendar
} from "lucide-react";
import PageHeader from "../components/page/PageHeader";

import "../css/page/ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra không bỏ trống
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Vui lòng nhập đầy đủ các thông tin bắt buộc!");
      return;
    }

    setLoading(true);

    // Gửi dữ liệu tới Backend (giống ProductPage)
    axios
      .post("http://localhost:8080/api/contacts", form)
      .then((res) => {
        alert(`Cảm ơn ${form.name}, Mobile Store đã nhận được tin nhắn của bạn, chúng tôi sẽ phản hồi bạn sớm nhất qua email bạn nhập bên dưới!`);
        setForm({ name: "", email: "", message: "" }); // Reset form sau khi gửi thành công
      })
      .catch((err) => {
        console.error("Gửi tin nhắn thất bại:", err);
        alert("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="contact-wrapper">
      {/* Header dùng chung của project */}
      <PageHeader />

      <main className="contact-container">
        {/* --- HERO SECTION --- */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>Mobile Store - Kỷ Nguyên Công Nghệ Mới</h1>
            <p>Hành trình từ một cửa hàng nhỏ đến hệ thống bán lẻ công nghệ top đầu Việt Nam.</p>
          </div>
        </section>

        {/* --- BRAND STORY --- */}
        <section className="brand-story">
          <div className="story-text">
            <h2>Giới thiệu về chúng tôi</h2>
            <p>
              Được thành lập vào đầu năm <strong>2019</strong>, 
              <strong> Mobile Store</strong> ra đời với sứ mệnh mang những sản phẩm công nghệ tiên tiến nhất đến tay người tiêu dùng với mức giá cạnh tranh nhất.
            </p>
            <p>
              Chúng tôi tự hào là đối tác chiến lược của Apple, Samsung, Xiaomi, và Oppo. 
              Với triết lý "Khách hàng là trọng tâm", mỗi sản phẩm đều đi kèm cam kết chất lượng tuyệt đối.
            </p>
            <div className="story-features">
              <div className="feat-item"><CheckCircle2 size={18} color="#22c55e"/> Sản phẩm chính hãng 100%</div>
              <div className="feat-item"><CheckCircle2 size={18} color="#22c55e"/> Giá cả cạnh tranh nhất thị trường</div>
              <div className="feat-item"><CheckCircle2 size={18} color="#22c55e"/> Hỗ trợ kỹ thuật 24/7</div>
            </div>
          </div>
          <div className="story-stats">
            <div className="stat-card">
              <Store size={32} />
              <h3>15+</h3>
              <p>Chi nhánh tại TP.HCM</p>
            </div>
            <div className="stat-card">
              <Users size={32} />
              <h3>50.000+</h3>
              <p>Khách hàng tin dùng</p>
            </div>
            <div className="stat-card">
              <Calendar size={32} />
              <h3>2019</h3>
              <p>Năm thành lập</p>
            </div>
            <div className="stat-card">
              <Globe size={32} />
              <h3>63</h3>
              <p>Tỉnh thành giao hàng</p>
            </div>
          </div>
        </section>

        {/* --- CORE VALUES --- */}
        <section className="about-highlights">
          <div className="highlight-card">
            <Award className="icon" size={40} />
            <h3>Top 1 Uy Tín</h3>
            <p>Đơn vị bán lẻ có dịch vụ chăm sóc khách hàng xuất sắc nhất năm 2024.</p>
          </div>
          <div className="highlight-card">
            <ShieldCheck className="icon" size={40} />
            <h3>Bảo Hành Toàn Diện</h3>
            <p>Chính sách lỗi 1 đổi 1 trong 45 ngày và bảo hành rơi vỡ đặc biệt.</p>
          </div>
          <div className="highlight-card">
            <Truck className="icon" size={40} />
            <h3>Vận Chuyển Hỏa Tốc</h3>
            <p>Giao hàng nội thành TP.HCM chỉ trong 2 giờ.</p>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section className="contact-main-content">
          <div className="content-grid">
            {/* Info Panel */}
            <div className="contact-info-panel">
              <h2>Thông tin liên hệ</h2>
              <p className="description">Hệ thống 15 cửa hàng luôn sẵn sàng phục vụ bạn.</p>

              <div className="info-list">
                <div className="info-item">
                  <div className="icon-box"><Phone size={20} /></div>
                  <div>
                    <h4>Tổng đài miễn phí</h4>
                    <p>1800 1234 (Mua hàng) - 1800 5678 (Kỹ thuật)</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-box"><Mail size={20} /></div>
                  <div>
                    <h4>Email doanh nghiệp</h4>
                    <p>mobilestore2025pr4@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-box"><MapPin size={20} /></div>
                  <div>
                    <h4>Trụ sở chính</h4>
                    <p>Số 1 High-Tech Tower, Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Panel */}
            <div className="contact-form-panel">
              <h2>Kết nối với chúng tôi</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Nguyễn Văn A" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="email@gmail.com" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Chúng tôi có thể giúp gì?</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    placeholder="Nhập thắc mắc hoặc yêu cầu..." 
                    value={form.message} 
                    onChange={handleChange} 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={loading}
                >
                  {loading ? "Đang gửi..." : "Gửi yêu cầu hỗ trợ"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}