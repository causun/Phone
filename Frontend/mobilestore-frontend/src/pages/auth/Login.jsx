import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './auth.css';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
  if (!email || !password) {
    alert("Vui lòng nhập email và mật khẩu");
    return;
  }

  try {
    const res = await axios.post("/auth/login", {
      email: email.trim().toLowerCase(),
      password
    });

    if (res.data.success) {
      const user = res.data.data;
      localStorage.setItem("user", JSON.stringify(user));

      user.role === "ADMIN"
        ? navigate("/admin/dashboard")
        : navigate("/user/home");
    } else {
      // Kiểm tra nếu lỗi là do tài khoản chưa kích hoạt
      if (res.data.message.includes("Email hoặc mật khẩu không đúng") && email) {
         // Nếu bạn muốn tinh tế hơn, Backend nên trả về message "Tài khoản chưa kích hoạt"
         // để bạn điều hướng người dùng quay lại trang nhập OTP.
         alert(res.data.message);
      } else {
         alert(res.data.message);
      }
    }
  } catch (err) {
    console.error(err);
    alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc kết nối mạng.");
  }
};

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin}>Login</Button>

      <br/>
      <p>Don't have account? <a href="/register">Register</a></p>

      <br/>
      <p>Forgot password? <a href="/forgot-password">Recover </a></p>

    </div>
  );
}

export default Login;
