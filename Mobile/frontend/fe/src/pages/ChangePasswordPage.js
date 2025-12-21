import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import PageHeader from "../components/page/PageHeader";
import { DataContext } from "../DataContext";
import "../css/page/ChangePasswordPage.css";

function ChangePasswordPage() {
  const { token } = useContext(DataContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= AUTO GET EMAIL FROM TOKEN ================= */
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setForm((prev) => ({
        ...prev,
        email: decoded.sub, // ✅ email đang đăng nhập
      }));
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, [token]);

  /* ================= HANDLE INPUT ================= */
  const handleChangeInput = (e) => {
    const { name, value } = e.target; // ✅ FIX LỖI TS1182
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/change-password",
        {
          email: form.email,
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Đổi mật khẩu thành công!");

        setTimeout(() => {
          navigate("/profile");
        }, 800);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Đổi mật khẩu thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER ================= */
  return (
    <>
      <PageHeader />

      <div className="change-pass-page">
        <div className="change-pass-card">
          <h3 className="change-pass-title">Change Password</h3>
          <p className="change-pass-subtitle">
            Cập nhật mật khẩu mới cho tài khoản của bạn
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL (READONLY) */}
            <div className="change-pass-group">
              <label>Email</label>
              <input type="email" value={form.email} readOnly />
            </div>

            {/* OLD PASSWORD */}
            <div className="change-pass-group">
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                placeholder="••••••••"
                value={form.oldPassword}
                onChange={handleChangeInput}
                required
              />
            </div>

            {/* NEW PASSWORD */}
            <div className="change-pass-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="••••••••"
                value={form.newPassword}
                onChange={handleChangeInput}
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="change-pass-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChangeInput}
                required
              />
            </div>

            <button
              type="submit"
              className="change-pass-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Change Password"}
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default ChangePasswordPage;
