import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

import PageHeader from "../components/page/PageHeader";
import "../css/page/ResetPasswordPage.css";

function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: location.state?.email || "",
    otpCode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/verify-reset-otp",
        data
      );

      if (res.status === 200) {
        toast.success("Đặt lại mật khẩu thành công 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } catch (error) {
      toast.error("OTP không hợp lệ hoặc đã hết hạn ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader />

      <div className="reset-page">
        <div className="reset-card">
          <h2 className="reset-title">Reset Password</h2>
          <p className="reset-subtitle">
            Nhập mã OTP để xác nhận đặt lại mật khẩu
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="reset-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                disabled
              />
            </div>

            {/* OTP */}
            <div className="reset-group">
              <label>OTP Code</label>
              <input
                type="text"
                name="otpCode"
                placeholder="Enter OTP"
                value={data.otpCode}
                onChange={handleChangeInput}
                disabled={loading}
                required
              />
            </div>

            <button className="reset-btn" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default ResetPasswordPage;
