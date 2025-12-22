// src/admin/page/AdminHeader.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Grid, User, ChevronDown } from "lucide-react";

export default function AdminHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token || token === "undefined") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  /* ===== CLICK OUTSIDE ===== */
  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.left}>
            <span
              style={styles.title}
              onClick={() => navigate("/admin")}
            >
              Kênh Người Bán
            </span>
          </div>

          <div style={styles.right}>
            <Grid size={22} style={styles.icon} />
            <Bell size={22} style={styles.icon} />

            <div
              style={styles.userBox}
              ref={boxRef}
              onClick={() => setOpen((o) => !o)}
            >
              <User size={20} color="#fff" />
              <span style={styles.username}>Admin</span>
              <ChevronDown size={18} color="#fff" />

              {open && (
                <div className="dropdown-admin">
                  <button onClick={logout}>Đăng xuất</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== STYLE RIÊNG ===== */}
      <style>{`
        html, body, #root {
          background:#fff !important;
          margin:0;
          padding:0;
        }

        .dropdown-admin {
          position: absolute;
          right: 0;
          top: 45px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 6px 0;
          min-width: 140px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          z-index: 1000;
        }

        .dropdown-admin button {
          width: 100%;
          background: #fff;
          color:#333;
          border: none;
          padding: 10px 16px;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
        }

        .dropdown-admin button:hover {
          background: #f5f5f5;
        }
      `}</style>
    </>
  );
}

/* ===== STYLE OBJECT ===== */
const styles = {
  wrapper: {
    width: "100%",
    background: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999,
  },
  header: {
    maxWidth: 1380,
    margin: "0 auto",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    background: "#e53935",
  },
  left: { display: "flex", alignItems: "center", gap: 12 },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
  },
  right: { display: "flex", alignItems: "center", gap: 22 },
  icon: { cursor: "pointer", color: "#fff" },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: 8,
    position: "relative",
    background: "rgba(255,255,255,0.18)",
  },
  username: { fontSize: 14, fontWeight: 500, color: "#fff" },
};
