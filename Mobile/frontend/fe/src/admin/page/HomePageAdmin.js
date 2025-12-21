import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import {
  Package,
  ShoppingBag,
  Tag,
  BarChart2,
} from "lucide-react";

import AdminHeader from "./AdminHeader";
import "./HomeAdmin.css";

export default function HomeAdmin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    confirmed: 0,
    shipping: 0,
    completed: 0,
    cancelled: 0,
  });

  /* ===== DOANH THU ===== */
  const [revenueToday, setRevenueToday] = useState(null);
  const [revenueMonth, setRevenueMonth] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  /* ================= LOAD ALL DASHBOARD DATA ================= */
  const loadDashboard = async () => {
    try {
      // ===== PRODUCTS =====
      const productRes = await adminAxios.get("/products");
      const productData = Array.isArray(productRes.data)
        ? productRes.data
        : productRes.data?.data;

      setProducts(productData || []);

      // ===== ORDERS =====
      const orderRes = await adminAxios.get("/orders");
      const list = orderRes.data || [];

      setOrderStats({
        pending: list.filter(o => o.status === "PENDING").length,
        confirmed: list.filter(o => o.status === "CONFIRMED").length,
        shipping: list.filter(o => o.status === "SHIPPING").length,
        completed: list.filter(o => o.status === "COMPLETED").length,
        cancelled: list.filter(o => o.status === "CANCELLED").length,
      });

      // ===== REVENUE TODAY =====
      const todayRes = await adminAxios.get("/admin/revenue/today");
      setRevenueToday(todayRes.data);

      // ===== REVENUE MONTH =====
      const monthRes = await adminAxios.get("/admin/revenue/month");
      setRevenueMonth(monthRes.data);

    } catch (err) {
      console.error("Dashboard error:", err.response?.data);
      // 401 sẽ được interceptor xử lý
    }
  };

  const formatMoney = (v) =>
    v != null ? v.toLocaleString("vi-VN") + " ₫" : "--";

  return (
    <>
      <AdminHeader />
      <div style={{ height: 80 }} />

      <div className="admin-wrapper">
        <div className="admin-container">

          {/* ===== QUẢN LÝ SẢN PHẨM ===== */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Quản Lý Sản Phẩm</h2>
              <Link to="/admin/products">Xem thêm</Link>
            </div>

            <div className="admin-grid-4">
              <Link to="/admin/products" className="admin-box">
                <Package size={26} color="#ee4d2d" />
                <p>Số sản phẩm</p>
                <span>{products.length}</span>
              </Link>

              <Link to="/admin/products/add" className="admin-box">
                <Tag size={26} color="#3b82f6" />
                <p>Thêm sản phẩm</p>
                <span>Tạo mới</span>
              </Link>

              <Link to="/admin/reviews" className="admin-box">
                <Tag size={26} color="#3b82f6" />
                <p>Đánh giá</p>
                <span>Xem</span>
              </Link>

              <Link to="/admin/news" className="admin-box">
                <Tag size={26} color="#3b82f6" />
                <p>Tin Tức</p>
                <span>Xem</span>
              </Link>
            </div>
          </div>

          {/* ===== QUẢN LÝ ĐƠN HÀNG ===== */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Quản Lý Đơn Hàng</h2>
              <Link to="/admin/orders">Xem thêm</Link>
            </div>

            <div className="admin-grid-4">
              <Link
                to="/admin/orders?status=PENDING"
                className="admin-box box-pending"
              >
                <ShoppingBag size={26} color="#ef4444" />
                <p>Chờ xử lý</p>
                <span>{orderStats.pending}</span>
              </Link>

              <Link
                to="/admin/orders?status=SHIPPING"
                className="admin-box box-shipping"
              >
                <ShoppingBag size={26} color="#3b82f6" />
                <p>Đang giao</p>
                <span>{orderStats.shipping}</span>
              </Link>

              <Link
                to="/admin/orders?status=COMPLETED"
                className="admin-box box-completed"
              >
                <ShoppingBag size={26} color="#22c55e" />
                <p>Hoàn thành</p>
                <span>{orderStats.completed}</span>
              </Link>

              <Link
                to="/admin/orders?status=CANCELLED"
                className="admin-box box-cancel"
              >
                <ShoppingBag size={26} color="#6b7280" />
                <p>Đã hủy</p>
                <span>{orderStats.cancelled}</span>
              </Link>
            </div>
          </div>

          {/* ===== DOANH THU ===== */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Thống Kê Doanh Thu</h2>
              <Link to="/admin/revenue">Xem thêm</Link>
            </div>

            <div className="admin-grid-3">
              <div className="admin-stat">
                <BarChart2 size={30} color="#ef4444" />
                <p>Doanh thu hôm nay</p>
                <h3>{formatMoney(revenueToday?.totalRevenue)}</h3>
              </div>

              <div className="admin-stat">
                <BarChart2 size={30} color="#22c55e" />
                <p>Doanh thu tháng</p>
                <h3>{formatMoney(revenueMonth?.totalRevenue)}</h3>
              </div>

              <div className="admin-stat">
                <BarChart2 size={30} color="#3b82f6" />
                <p>Tổng lượt mua</p>
                <h3>{revenueMonth?.totalOrders ?? 0}</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
