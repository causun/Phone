import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";


function AdminNavbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUserName(user.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <span style={styles.pageTitle}>Admin Panel</span>
      </div>

      <div style={styles.rightSection}>
        <span style={styles.userName}>
          <FaUserCircle size={20} style={{ marginRight: "6px" }} />
          {userName}
        </span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",   // ⭐ FIX
    top: 0,
    left: 0,
    width: "100%",       // ⭐ FIX
    zIndex: 999,
    marginLeft: "260px", // ⭐ SAU KHI SET WIDTH 100%, GIỮ GỌN
  },

  leftSection: { display: "flex", alignItems: "center" },

  pageTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  userName: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },

  logoutBtn: {
    background: "#ff4d4f",
    border: "none",
    color: "white",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default AdminNavbar;
