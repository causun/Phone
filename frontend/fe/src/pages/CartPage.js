import React, { useState, useEffect } from "react";
import "../css/page/CartPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PageHeader from "../components/page/PageHeader";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // ============ LOAD USER ============
  useEffect(() => {
    const savedUser = localStorage.getItem("user-data");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const token = localStorage.getItem("trip-token");
      if (token) {
        axios
          .get("http://localhost:8080/api/auth/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUser(res.data.data);
            localStorage.setItem("user-data", JSON.stringify(res.data.data));
          })
          .catch(() => setUser(null));
      }
    }
  }, []);

  // ============ LOAD CART THEO USER ============
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    const key = `cart_${user.email}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    setCart(saved);
  }, [user]);

  // ============ UPDATE QTY ============
  const updateQty = (id, delta) => {
    if (!user) return;
    const key = `cart_${user.email}`;

    let newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });

    localStorage.setItem(key, JSON.stringify(newCart));
    setCart(newCart);
  };

  // ============ REMOVE ITEM ============
  const removeItem = (id) => {
    if (!user) return;
    const key = `cart_${user.email}`;

    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(newCart));
    setCart(newCart);
  };

  // ============ TÍNH TỔNG ============
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // ============ CHECKOUT ============
  const checkout = () => {
    // kiểm tra giỏ hàng rỗng
    if (cart.length === 0) {
      alert("Giỏ hàng chưa có sản phẩm, hãy chọn sản phẩm trước!");
      navigate("/");
      return;
    }

    const token = localStorage.getItem("trip-token");
    if (!token) {
      alert("Bạn cần đăng nhập để đặt hàng!");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-container">

      {/* Header */}
      <PageHeader user={user} key={user?.email} />

      <h2>Giỏ hàng</h2>

      <div className="cart-grid">

        <div className="cart-items">
          {cart.length === 0 && <p>Giỏ hàng trống</p>}

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              {/* FIX IMAGE */}
              <img src={item.imageUrls?.[0]} alt={item.name} />

              <div className="info">
                <div className="name">{item.name}</div>

                <div className="price">
                  {item.price.toLocaleString()} ₫
                </div>

                <div className="qty-box">
                  <button onClick={() => updateQty(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, +1)}>+</button>
                </div>

                <button className="remove" onClick={() => removeItem(item.id)}>
                  Xóa
                </button>
              </div>

              <div className="subtotal">
                {(item.price * item.quantity).toLocaleString()} ₫
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Tổng tiền</h3>

          <div className="sum-row">
            <span>Tạm tính:</span>
            <strong>
              {total.toLocaleString()} ₫
            </strong>
          </div>

          <button className="btn-checkout" onClick={checkout}>
            Đặt hàng
          </button>

          <button
            className="btn-continue"
            onClick={() => navigate("/")}
          >
            Tiếp tục mua sắm
          </button>
        </div>

      </div>
    </div>
  );
}
