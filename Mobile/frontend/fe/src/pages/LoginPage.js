import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";
import PageHeader from "../components/page/PageHeader";
import "../css/page/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { setToken, setUser } = useContext(DataContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        data
      );

      const accessToken =
        res.data.accessToken ||
        res.data.access_token ||
        res.data.token;

      if (!accessToken) {
        toast.error("Token không hợp lệ từ server");
        return;
      }

      setToken(accessToken);

      const meRes = await axios.get(
        "http://localhost:8080/api/auth/user/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUser(meRes.data.data || meRes.data);

      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch {
      toast.error("Sai email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader />

      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">
            Đăng nhập để tiếp tục mua sắm
          </p>

          <form onSubmit={handleSubmit}>
            <div className="login-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                onChange={handleChangeInput}
                required
              />
            </div>

            <div className="login-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChangeInput}
                required
              />
            </div>

            {/* 🔹 FORGOT PASSWORD */}
            <div className="login-forgot">
              <Link to="/forgot-password">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="login-footer">
            Chưa có tài khoản?{" "}
            <Link to="/register">Đăng ký</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
