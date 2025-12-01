import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import '../../styles/auth/auth.css';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const res = await axios.post('/auth/register', { name, email, password, phone, birthday });
//       if(res.data.success){
//         alert('Register success!');
//         navigate('/login');
//       } else alert(res.data.message);
//     } catch(e){ alert('Register failed'); }
//   };
    const handleRegister = async () => {
    try {
        const res = await axios.post("/auth/register", { name, email, password, phone, birthday });
        if(res.data.success){
        alert("Đăng ký thành công!");
        // reset form
        setName(""); setEmail(""); setPassword(""); setPhone(""); setBirthday("");
        // chuyển tới login
        navigate("/login");
        } else {
        alert(res.data.message);
        }
    } catch(err){
        console.error(err);
        alert("Đăng ký thất bại, xem console");
    }
    };


  return (
    <div className="auth-container">
      <h2>Register</h2>
      <Input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <Input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <Input type="date" placeholder="Birthday" value={birthday} onChange={e=>setBirthday(e.target.value)} />
      <Button onClick={handleRegister}>Register</Button>
      <p>Already have account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Register;
