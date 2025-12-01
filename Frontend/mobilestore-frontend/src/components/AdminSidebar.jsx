import { Link } from "react-router-dom";
import {
  BsSpeedometer2,
  BsBoxSeam,
  BsGrid3X3Gap,
  BsNewspaper,
} from "react-icons/bs";

function AdminSidebar() {
  return (
    <div
      style={{
      width: "260px",
      background: "#343a40",
      color: "white",
      position: "fixed",       // ⬅ GIỮ NGUYÊN VỊ TRÍ
      top: 0,
      left: 0,
      height: "100vh",         // ⬅ CHIỀU CAO FULL MÀN HÌNH
      paddingTop: "15px",
    }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: "0 15px" }}>

          {/* DASHBOARD */}
          <li>
            <Link
              to="/admin/dashboard"
              className="menu-item no-arrow"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <BsSpeedometer2 className="menu-icon" />
              Dashboard
            </Link>
          </li>

          {/* PRODUCT MANAGEMENT */}
          <li>
            <Link
              to="/admin/products"
              className="menu-item no-arrow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "10px 0",
              }}
            >
              <BsBoxSeam className="menu-icon" />
              Product Management
            </Link>
          </li>

          {/* CATEGORY MANAGEMENT */}
          <li>
            <Link
              to="/admin/categories"
              className="menu-item no-arrow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "10px 0",
              }}
            >
              <BsGrid3X3Gap className="menu-icon" />
              Category Management
            </Link>
          </li>

          {/* NEWS MANAGEMENT */}
          <li>
            <Link
              to="/admin/news"
              className="menu-item no-arrow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "10px 0",
              }}
            >
              <BsNewspaper className="menu-icon" />
              News Management
            </Link>
          </li>
        </ul>
      </nav>

      {/* Styles */}
      <style>{`
        .menu-item {
          padding: 12px;
          cursor: pointer;
          color: white;
          border-radius: 6px;
          text-decoration: none;
        }

        .menu-item:hover {
          background: #495057;
        }

        .menu-icon {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}

export default AdminSidebar;
