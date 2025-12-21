import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../css/page/RegisterPage.css";

import PageHeader from "../components/page/PageHeader";

function RegisterPage() {
  const initialData = {
    fullName: "",
    email: "",
    password: "",
    gender: "MALE",
    phone: "",
  };

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= HANDLE INPUT ================= */
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:8080/api/auth/register", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Đăng ký thành công 🎉");

          setTimeout(() => {
            navigate("/verify-register", {
              state: { email: data.email },
            });
          }, 1500);
        } else {
          toast.error("Đăng ký thất bại, vui lòng thử lại!");
        }
      })
      .catch(() => {
        toast.error("Đăng ký thất bại, vui lòng thử lại!");
      })
      .finally(() => setLoading(false));
  };

  /* ================= RENDER ================= */
  return (
    <>
      <PageHeader />

      <div className="register-page">
        <div className="register-card">
          <h2 className="register-title">Create Your Account</h2>
          <p className="register-subtitle">
            Join us and explore the experience
          </p>

          <form onSubmit={handleSubmit}>
            {/* FULL NAME */}
            <div className="register-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                onChange={handleChangeInput}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="register-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChangeInput}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="register-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChangeInput}
                required
              />
            </div>

            {/* GENDER */}
            <div className="register-group">
              <label>Gender</label>
              <div className="gender-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    defaultChecked
                    onChange={handleChangeInput}
                  />{" "}
                  Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    onChange={handleChangeInput}
                  />{" "}
                  Female
                </label>
              </div>
            </div>

            {/* PHONE */}
            <div className="register-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleChangeInput}
              />
            </div>

            {/* BUTTON */}
            <button className="register-btn" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {loading ? "Registering..." : "Register Now"}
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default RegisterPage;
