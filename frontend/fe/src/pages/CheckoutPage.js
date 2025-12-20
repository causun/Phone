import React, { useEffect, useState } from "react";
import "../css/oders/Checkout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/page/PageHeader";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: ""
  });

  // ⭐ Load user FROM backend (fix)
  useEffect(() => {
    const token = localStorage.getItem("trip-token");
    if (!token) return;

    axios.get("http://localhost:8080/api/auth/user/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const u = res.data.data;
      setUser(u);

      setForm({
        fullName: u.fullName,
        phone: u.phone || "",
        address: u.address || "",
        note: ""
      });

      const key = `cart_${u.email}`;
      const c = JSON.parse(localStorage.getItem(key)) || [];
      setCart(c);
    });
  }, []);

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const changeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitOrder = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập!");
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("trip-token");

    try {
      await axios.post(
        "http://localhost:8080/api/orders",
        {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          note: form.note,
          items: cart.map((c) => ({
            productId: c.id,
            quantity: c.quantity
          }))
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.removeItem(`cart_${user.email}`);

      alert("Đặt hàng thành công!");
      navigate("/my-orders");
    } catch (err) {
      alert("Đặt hàng thất bại!");
    }
  };

  return (
    <div className="checkout-container">

      <PageHeader user={user} key={user?.email} />

      <h2>Thanh toán</h2>

      <div className="checkout-grid">

        <div className="checkout-left">
          <h4>Thông tin giao hàng</h4>

          <input name="fullName" value={form.fullName}
            onChange={changeForm} readOnly/>
          <input name="phone" value={form.phone}
            onChange={changeForm} readOnly/>
          <input name="address" value={form.address}
            onChange={changeForm} readOnly/>
        </div>

        <div className="checkout-right">
          <h4>Đơn hàng của bạn</h4>

          {cart.map(item => (
            <div className="co-item" key={item.id}>
              <span>{item.name}</span>
              <span>{(item.price * item.quantity).toLocaleString()} ₫</span>
            </div>
          ))}

          <hr/>

          <div className="co-total">
            <span>Tổng tiền</span>
            <strong>{total.toLocaleString()} ₫</strong>
          </div>

          <button className="co-btn" onClick={submitOrder}>
            Đặt hàng
          </button>
        </div>

      </div>
    </div>
  );
}
