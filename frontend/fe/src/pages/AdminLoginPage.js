import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/admin/login",
        form
      );

      const token =
        res.data.access_token ||
        res.data.accessToken ||
        res.data.token;

      if (!token) {
        toast.error("Token không hợp lệ từ server");
        return;
      }

      localStorage.setItem("adminToken", token);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + token;

      toast.success("Đăng nhập admin thành công");

      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);

    } catch (err) {

      const data = err.response?.data;
      let msg = "Sai email hoặc mật khẩu";

      // ƯU TIÊN như LoginPage
      if (typeof data === "string") {
        msg = data;
      }
      else if (data?.message) {
        msg = data.message;
      }
      else if (data?.error) {
        // convert error code -> tiếng Việt
        if (data.error === "INVALID_CREDENTIALS") {
          msg = "Email hoặc mật khẩu không đúng";
        }
        else if (data.error === "INVALID_ROLE") {
          msg = "Tài khoản này không phải admin";
        }
        else msg = data.error;
      }

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "100px auto" }}>
      <h3>Admin Login</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email admin"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
