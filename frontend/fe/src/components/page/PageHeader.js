import React, { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext";
import "./PageHeader.css";

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function PageHeader() {
  const navigate = useNavigate();
  const { user, logout, cart } = useContext(DataContext);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu((prev) => !prev);

  // Tổng số lượng sản phẩm trong giỏ
  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

  // Avatar URL (chống cache khi avatar thay đổi)
  const avatarUrl = useMemo(() => {
    if (!user?.avatar) return null;
    return `${user.avatar}?v=${user.updatedAt || user.id || "1"}`;
  }, [user?.avatar, user?.updatedAt]);

  const handleCartClick = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để xem giỏ hàng!");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="uh-header">
      <div className="uh-container">
        <div className="uh-logo" onClick={() => navigate("/")}>
          Mobile<span>S</span>tore
        </div>

        <nav className="uh-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/news">Tin tức</Link>
          <Link to="/contact">Liên hệ</Link>
        </nav>

        <div className="uh-actions">
          {user ? (
            <div className="uh-user">
              <div className="uh-avatar" onClick={toggleMenu}>
                {avatarUrl ? (
                 <img
                  src={user.avatar}
                  alt="avatar"
                  className="profile-avatar"

                />
                ) : (
                  user.fullName?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              {openMenu && (
                <div className="uh-menu">
                  <div onClick={() => navigate("/profile")}>👤 Thông tin</div>
                  <div onClick={() => navigate("/my-orders")}>📦 Đơn hàng</div>
                  <div onClick={logout}>🚪 Đăng xuất</div>
                </div>
              )}
            </div>
          ) : (
            <button className="uh-login" onClick={() => navigate("/login")}>
              Đăng nhập
            </button>
          )}

          <div
            className="uh-cart"
            onClick={handleCartClick}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <span style={{ fontSize: "24px" }}>🛒</span>
            {cartCount > 0 && <span className="uh-cart-count">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  );
}
