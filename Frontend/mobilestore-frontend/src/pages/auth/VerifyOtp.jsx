import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./auth.css";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get("email");

  const [otp, setOtp] = useState("");
  // 1. Quản lý thời gian đếm ngược (60 giây)
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // 2. Bộ đếm ngược tự động chạy
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  /* ===== XỬ LÝ XÁC THỰC ===== */
  const handleVerify = async () => {
    if (!otp) {
      alert("Vui lòng nhập OTP");
      return;
    }
    try {
      const res = await axios.post("/auth/verify-otp", {
        email: email.trim().toLowerCase(),
        otp
      });
      // Vì ApiResponse của bạn trả về {success, message, data}
      if (res.data.success) {
        alert("Kích hoạt tài khoản thành công");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Mã OTP không đúng hoặc hết hạn");
    }
  };

  /* ===== XỬ LÝ GỬI LẠI MÃ ===== */
  const handleResendOtp = async () => {
    if (!canResend) return; // Nếu chưa hết thời gian thì không cho bấm

    try {
      const res = await axios.post("/auth/resend-otp", {
        email: email.trim().toLowerCase()
      });

      if (res.data.success) {
        alert("Mã OTP mới đã được gửi!");
        // 3. Sau khi gửi thành công, reset lại bộ đếm để khóa nút tiếp
        setCountdown(60);
        setCanResend(false);
        setOtp(""); 
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Lỗi: Không thể gửi lại mã vào lúc này");
    }
  };

  return (
    <div className="auth-container">
      <h2>Xác thực OTP</h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
        Mã xác thực đã gửi tới: <strong>{email}</strong>
      </p>

      <Input
        placeholder="Nhập mã OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <Button onClick={handleVerify}>Xác thực</Button>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {canResend ? (
          // Khi có thể gửi lại (canResend === true)
          <span 
            onClick={handleResendOtp} 
            style={{ 
              color: "#007bff", 
              cursor: "pointer", 
              fontWeight: "bold",
              textDecoration: "underline" 
            }}
          >
            Gửi lại mã OTP
          </span>
        ) : (
          // Khi đang đếm ngược (canResend === false)
          <span style={{ color: "#999", cursor: "not-allowed" }}>
            Gửi lại mã sau <strong>{countdown}s</strong>
          </span>
        )}
      </div>
    </div>
  );
}

export default VerifyOtp;