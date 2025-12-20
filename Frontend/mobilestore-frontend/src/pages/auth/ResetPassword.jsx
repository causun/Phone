import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./auth.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = async () => {
    if (!otp || !newPassword || !confirm) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirm) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await axios.post("/auth/forgot-password/reset", {
        email: email.trim().toLowerCase(),
        otp,
        newPassword,
      });

      if (res.data.success) {
        alert("Đổi mật khẩu thành công");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("OTP không hợp lệ hoặc đã hết hạn");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đặt lại mật khẩu</h2>
      <p>Email:</p>
      <b>{email}</b>

      <Input
        placeholder="Nhập OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Mật khẩu mới"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Xác nhận mật khẩu"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <Button onClick={handleReset}>Xác nhận</Button>
    </div>
  );
}

export default ResetPassword;
