import React, { useEffect, useState } from "react";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "./AdminHeader";
import "./AdminRevenue.css";

export default function AdminRevenuePage() {
  const [today, setToday] = useState(null);
  const [month, setMonth] = useState(null);
  const [custom, setCustom] = useState(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD TODAY + MONTH (GIỮ NGUYÊN LOGIC) ================= */
  useEffect(() => {
    adminAxios
      .get("/admin/revenue/today")
      .then((res) => setToday(res.data))
      .catch((err) =>
        console.error("Load today revenue error:", err.response?.data)
      );

    adminAxios
      .get("/admin/revenue/month")
      .then((res) => setMonth(res.data))
      .catch((err) =>
        console.error("Load month revenue error:", err.response?.data)
      );
  }, []);

  /* ================= CUSTOM RANGE (GIỮ NGUYÊN) ================= */
  const loadCustomRevenue = async () => {
    if (!from || !to) {
      alert("Vui lòng chọn ngày bắt đầu và kết thúc");
      return;
    }

    setLoading(true);
    try {
      const res = await adminAxios.get(
        `/admin/revenue?from=${from}&to=${to}`
      );
      setCustom(res.data);
    } catch (err) {
      console.error("Load custom revenue error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (v) =>
    v != null ? v.toLocaleString() + " ₫" : "--";

  /* ================= UI ================= */
  return (
    <>
      <AdminHeader />

      <div className="rev-wrapper">
        <h2 className="rev-title">📊 Thống kê doanh thu</h2>

        {/* ===== SUMMARY ===== */}
        <div className="rev-grid">
          <div className="rev-card blue">
            <h4>Hôm nay</h4>
            <p className="rev-money">
              {formatMoney(today?.totalRevenue)}
            </p>
            <span>{today?.totalOrders || 0} đơn</span>
          </div>

          <div className="rev-card green">
            <h4>Tháng này</h4>
            <p className="rev-money">
              {formatMoney(month?.totalRevenue)}
            </p>
            <span>{month?.totalOrders || 0} đơn</span>
          </div>
        </div>

        {/* ===== CUSTOM RANGE ===== */}
        <div className="rev-box">
          <h3>📅 Doanh thu theo khoảng ngày</h3>

          <div className="rev-filter">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <button onClick={loadCustomRevenue}>
              Xem doanh thu
            </button>
          </div>

          {loading && <p>Đang tải...</p>}

          {custom && (
            <div className="rev-result">
              <p>
                💰 Doanh thu:{" "}
                <b>{formatMoney(custom.totalRevenue)}</b>
              </p>
              <p>
                📦 Số đơn: <b>{custom.totalOrders}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
