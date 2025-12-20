import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      {/* RIGHT SIDE (Navbar + Content) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingLeft: "260px",   // ⭐ FIX QUAN TRỌNG
          minHeight: "100vh",
          background: "#f1f3f5",
        }}
      >
        <AdminNavbar />

        <main style={{ padding: "20px", marginTop: "60px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
