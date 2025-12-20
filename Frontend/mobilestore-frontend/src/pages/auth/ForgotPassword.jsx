import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Thêm loading
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      alert("Vui lòng nhập email");
      return;
    }

    setIsLoading(true); // ✅ Bắt đầu xử lý

    try {
      const res = await axios.post("/auth/forgot-password/send-otp", {
        email: email.trim().toLowerCase(),
      });

      if (res.data.success) {
        alert("OTP đã gửi tới email");
        navigate(`/reset-password?email=${email}`);
      } else {
        alert(res.data.message);
        setIsLoading(false); // Mở lại nút nếu server báo lỗi logic
      }
    } catch (err) {
      alert("Email chưa được đăng ký hoặc lỗi hệ thống");
      setIsLoading(false); // Mở lại nút nếu lỗi API
    }
  };

  return (
    <div className="auth-container">
      <h2>Quên mật khẩu</h2>
      <Input
        type="email"
        placeholder="Nhập email đăng ký"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* ✅ Cập nhật Button */}
      <Button 
        onClick={handleSendOtp} 
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.7 : 1 }}
      >
        {isLoading ? "Đang xử lý..." : "Gửi OTP"}
      </Button>
    </div>
  );
}

export default ForgotPassword;