import React from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Youtube, 
  Send, ShieldCheck, Truck, RotateCcw, CreditCard 
} from 'lucide-react';
import './styles/UserFooter.css';

const UserFooter = () => {
  return (
    <footer className="main-footer">
      {/* 1. Trust Bar: Cam kết dịch vụ */}
      <div className="footer-trust-bar">
        <div className="trust-item">
          <ShieldCheck size={32} />
          <div>
            <h4>Chất lượng thật</h4>
            <p>Sản phẩm chính hãng 100%</p>
          </div>
        </div>
        <div className="trust-item">
          <Truck size={32} />
          <div>
            <h4>Giao hàng nhanh</h4>
            <p>Hỏa tốc 2h nội thành TP.HCM</p>
          </div>
        </div>
        <div className="trust-item">
          <RotateCcw size={32} />
          <div>
            <h4>Đổi trả dễ dàng</h4>
            <p>Lỗi 1 đổi 1 trong 45 ngày</p>
          </div>
        </div>
        <div className="trust-item">
          <CreditCard size={32} />
          <div>
            <h4>Thanh toán tiện lợi</h4>
            <p>Hỗ trợ trả góp 0% lãi suất</p>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-grid">
          {/* Cột 1: Giới thiệu & Kết nối */}
          <div className="footer-section">
            <h2 className="footer-logo">MOBILE<span>STORE</span></h2>
            <p className="footer-desc">
              Kỷ nguyên công nghệ mới - Thành lập từ 2019, chúng tôi tự hào mang đến 
              giải pháp công nghệ đỉnh cao cho hơn 50.000+ khách hàng.
            </p>
            <div className="social-links">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
              <a href="#"><Send size={20} /></a>
            </div>
          </div>

          {/* Cột 2: Thông tin chính sách */}
          <div className="footer-section">
            <h3>Chính sách & Hỗ trợ</h3>
            <ul>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Giao hàng & Thanh toán</a></li>
              <li><a href="#">Bảo mật thông tin</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          {/* Cột 3: Hotline & Liên hệ */}
          <div className="footer-section">
            <h3>Tổng đài hỗ trợ</h3>
            <div className="hotline-item">
              <div className="hotline-icon"><Phone size={18} /></div>
              <div className="hotline-info">
                <p>Mua hàng: <strong>1800 1234</strong></p>
                <span>(Miễn phí, 8:00 - 21:00)</span>
              </div>
            </div>
            <div className="hotline-item">
              <div className="hotline-icon"><Mail size={18} /></div>
              <div className="hotline-info">
                <p>Email liên hệ:</p>
                <strong>mobilestore2025pr4@gmail.com</strong>
              </div>
            </div>
          </div>

          {/* Cột 4: Hệ thống cửa hàng tiêu biểu */}
          <div className="footer-section">
            <h3>Trụ sở chính</h3>
            <div className="address-item">
              <MapPin size={24} className="address-icon" />
              <p>Số 1 High-Tech Tower, Quận 1, TP. Hồ Chí Minh</p>
            </div>
            <div className="store-badge">
              <p>Hệ thống <strong>15 chi nhánh</strong> tại TP.HCM sẵn sàng phục vụ bạn.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom: Bản quyền */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2019 - 2025 Mobile Store. All rights reserved.</p>
          <div className="payment-methods">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;