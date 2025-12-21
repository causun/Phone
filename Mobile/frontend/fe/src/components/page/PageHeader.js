import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../DataContext";
import "./PageHeader.css";

export default function PageHeader() {
  const navigate = useNavigate();
  const { user, logout } = useContext(DataContext);

  const [openMenu, setOpenMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setOpenMenu((prev) => !prev);

  /* ===== CART COUNT ===== */
  useEffect(() => {
    if (!user?.email) {
      setCartCount(0);
      return;
    }

    const key = `cart_${user.email}`;

    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem(key)) || [];
        const total = cart.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, [user?.email]);

  const goToCart = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để xem giỏ hàng!");
      navigate("/login");
      return;
    }
    navigate("/cart");
  };

  return (
    <header className="uh-header">
      <div className="uh-container">
        {/* LOGO */}
        <div className="uh-logo" onClick={() => navigate("/")}>
          Mobile<span>S</span>tore
        </div>

        {/* NAV */}
        <nav className="uh-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/news">Tin tức</Link>
          <Link to="/contact">Liên hệ</Link>
          {/* {user && <Link to="/my-orders">Đơn hàng</Link>} */}
        </nav>

        {/* ACTIONS */}
        <div className="uh-actions">
          {/* USER */}
          {user ? (
            <div className="uh-user">
              <div className="uh-avatar" onClick={toggleMenu}>
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" />
                ) : (
                  user.fullName?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              {openMenu && (
                <div className="uh-menu">
                  <div onClick={() => navigate("/profile")}>
                    👤 Thông tin
                  </div>
                  <div onClick={() => navigate("/my-orders")}>
                    📦 Đơn hàng
                  </div>
                  <div onClick={logout}>🚪 Đăng xuất</div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="uh-login"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </button>
          )}

          {/* CART */}
          <div className="uh-cart" onClick={goToCart}>
            🛒
            {cartCount > 0 && (
              <span className="uh-cart-count">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
