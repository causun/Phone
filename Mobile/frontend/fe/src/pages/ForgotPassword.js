import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/page/PageHeader";
import "../css/page/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Vui lòng nhập email!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/send-reset-otp",
        { email }
      );

      if (res.status === 200) {
        setIsSent(true);

        setTimeout(() => {
          navigate("/verify-reset", { state: { email } });
        }, 2000);
      } else {
        setError("Có lỗi xảy ra!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Không thể kết nối server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader />

      <div className="forgot-page">
        <div className="forgot-card">
          <h2 className="forgot-title">Quên mật khẩu</h2>
          <p className="forgot-subtitle">
            Nhập email để nhận mã OTP đặt lại mật khẩu
          </p>

          {isSent ? (
            <div className="forgot-success">
              ✅ Mã OTP đã được gửi tới <strong>{email}</strong>
              <br />
              Vui lòng kiểm tra email để tiếp tục
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger mb-3">
                  {error}
                </div>
              )}

              <div className="forgot-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="forgot-btn"
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi mã OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
