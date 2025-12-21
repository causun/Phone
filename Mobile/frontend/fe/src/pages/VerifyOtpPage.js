import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import PageHeader from "../components/page/PageHeader";
import "../css/page/VerifyOtpPage.css";

function VerifyOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromRegister = location.state?.email || "";

  const [data, setData] = useState({
    email: emailFromRegister,
    otpCode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        data
      );

      if (res.status === 200) {
        toast.success("Xác minh tài khoản thành công 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error("OTP không hợp lệ hoặc đã hết hạn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader />

      <div className="verify-page">
        <div className="verify-card">
          <h2 className="verify-title">Verify Your Account</h2>
          <p className="verify-subtitle">
            Nhập mã OTP đã được gửi tới email của bạn
          </p>

          <form onSubmit={handleVerify}>
            {/* EMAIL */}
            <div className="verify-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                disabled
              />
            </div>

            {/* OTP */}
            <div className="verify-group">
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

            <button className="verify-btn" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default VerifyOtpPage;
