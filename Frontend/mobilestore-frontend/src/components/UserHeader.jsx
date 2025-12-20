"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { ShoppingCart, LogOut, User, Package, ChevronDown } from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import './styles/UserHeader.css';

import { CartContext } from "../context/CartContext";

export default function UserHeader() {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) setUser(storedUser);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = cart?.reduce((s, i) => s + (i.quantity || 1), 0) || 0;

  const handleLogout = () => {
    if (window.confirm("Bạn có muốn đăng xuất không?")) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  // Hàm tạo Avatar mặc định nếu không có ảnh
const renderAvatar = () => {
  if (user?.avatar) {
    // Nối đường dẫn đến thư mục uploads của Backend
    const avatarUrl = `http://localhost:8081/uploads/avatars/${user.avatar}`;
    return (
      <img 
        src={avatarUrl} 
        alt="Avatar" 
        className="user-avatar-img" 
        onError={(e) => {
          // Nếu ảnh lỗi (sai path), tự động chuyển về placeholder
          e.target.onerror = null; 
          e.target.parentElement.innerHTML = `<div class="avatar-placeholder">${user.name.charAt(0).toUpperCase()}</div>`;
        }}
      />
    );
  }
  return (
    <div className="avatar-placeholder">
      {user?.name?.charAt(0).toUpperCase() || "U"}
    </div>
  );
};

  return (
    <header className={`modern-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* LOGO */}
        <div className="logo-section" onClick={() => navigate("/user/home")}>
          <div className="logo-icon">M</div>
          <span className="logo-text">Mobile<span>Store</span></span>
        </div>

        {/* NAVIGATION */}
        <nav className="main-nav">
          {[
            { name: "Trang chủ", path: "/user/home" },
            { name: "Sản phẩm", path: "/user/products" },
            { name: "Tin tức", path: "/user/news" },
            { name: "Liên hệ", path: "/user/contact" },
          ].map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={location.pathname === link.path ? "active" : ""}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        <div className="action-group">
          {/* CART */}
          <div className="icon-btn cart-wrapper" onClick={() => navigate("/user/cart")}>
            <ShoppingCart size={22} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </div>

          {/* USER SECTION */}
          {user ? (
            <div className="user-profile-wrapper" ref={dropdownRef}>
              <div 
                className={`profile-trigger ${showDropdown ? "active" : ""}`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {renderAvatar()}
                <ChevronDown size={14} className={`arrow ${showDropdown ? "rotate" : ""}`} />
              </div>

              {showDropdown && (
                <div className="modern-dropdown">
                  <div className="dropdown-info">
                    <p className="u-name">{user.name}</p>
                    <p className="u-email">{user.email || "Khách hàng thân thiết"}</p>
                  </div>
                  <hr />
                  <div className="dropdown-item" onClick={() => navigate("/user/profile")}>
                    <User size={16} /> Thông tin tài khoản
                  </div>
                  <div className="dropdown-item" onClick={() => navigate("/user/orders")}>
                    <Package size={16} /> Đơn hàng của tôi
                  </div>
                  <hr />
                  <div className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={16} /> Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>Đăng nhập</button>
          )}
        </div>
      </div>

      
    </header>
  );
}