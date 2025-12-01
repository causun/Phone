import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import '../../styles/auth/auth.css';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('/auth/login', { email, password });
//       if(res.data.success){
//         localStorage.setItem('user', JSON.stringify(res.data.data));
//         if(res.data.data.role === 'ADMIN') navigate('/admin/dashboard');
//         else navigate('/user/home');
//       } else alert(res.data.message);
//     } catch(e){ alert('Login failed'); }
//   };
    const handleLogin = async () => {
    try {
        const res = await axios.post("/auth/login", { email, password });
        console.log(res.data); // debug
        if(res.data.success){
        localStorage.setItem("user", JSON.stringify(res.data.data));
        // chuyển hướng đúng role
        res.data.data.role === "ADMIN" ? navigate("/admin/dashboard") : navigate("/user/home");
        } else {
        alert(res.data.message);
        }
    } catch(err){
        console.error(err.response || err.message);
        alert("Login failed, check console");
    }
    };


  return (
    <div className="auth-container">
      <h2>Login</h2>
      <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
      <p>Don't have account? <a href="/register">Register</a></p>
    </div>
  );
}

export default Login;
