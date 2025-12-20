import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./dashboard.css";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("today");
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // bộ lọc trạng thái
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch KPI stats
    axios.get(`/stats?range=${timeRange}`)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));

    // Fetch orders
    axios.get(`/orders/admin/all`)
      .then(res => {
        const mapped = res.data.map(o => ({
          id: o.id,
          orderCode: o.orderCode,
          customer: o.fullName,
          email: o.phone,
          createdAt: new Date(o.createdAt),
          date: new Date(o.createdAt).toLocaleString(),
          items: o.items.length,
          amount: o.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          status: o.status.toLowerCase()
        }));
        setOrders(mapped);
      })
      .catch(err => console.error(err));

    // Fetch chart data
    axios.get(`/chart?range=${timeRange}`)
      .then(res => setChartData(res.data))
      .catch(err => console.error(err));
  }, [timeRange]);

  // Lọc và sắp xếp
  const filteredOrders = orders
    .filter(o =>
      ((o.orderCode && o.orderCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()))
      &&
      (statusFilter === "all" || o.status === statusFilter)
    )
    .sort((a, b) => {
      // ưu tiên pending trước, sau đó theo thời gian mới nhất
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return b.createdAt - a.createdAt;
    });

  const itemsPerPage = 10; // 10 đơn/trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusClass = status => {
  // Chấp nhận cả "approved" (string) hoặc "1" (số/chuỗi số)
  if (status === "approved" || status === "1") return "status-completed";
  if (status === "pending" || status === "0") return "status-pending";
  if (status === "rejected" || status === "2") return "status-cancelled";
  return "";
};

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Quản lý đơn hàng và phân tích kinh doanh</p>
        </div>
        <div className="time-range">
          {["today", "week", "month"].map(range => (
            <button
              key={range}
              className={timeRange === range ? "active" : ""}
              onClick={() => setTimeRange(range)}
            >
              {range === "today" ? "Hôm nay" : range === "week" ? "Tuần" : "Tháng"}
            </button>
          ))}
        </div>
      </header>

      <section className="kpi-cards">
        {["orders", "revenue", "customers", "avgOrderValue"].map((key, index) => {
          const labels = ["Đơn hàng", "Doanh thu", "Khách hàng mới", "Giá trị TB/đơn"];
          const formats = ["number", "currency", "number", "currency"];
          const value = stats[key];
          const change = stats[`${key}Change`];
          return (
            <div className="card" key={index}>
              <div className="card-body">
                <h4>{labels[index]}</h4>
                {/* Sửa dòng này: Đổi $ thành đ và thêm 'vi-VN' */}
                <p>
                  {formats[index] === "currency" 
                    ? `${value.toLocaleString('vi-VN')} đ` 
                    : value.toLocaleString('vi-VN')}
                </p>
                <span className={change >= 0 ? "positive" : "negative"}>
                  {change >= 0 ? "+" : ""}{change}%
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="orders-chart">
        <h3>Xu hướng đơn hàng</h3>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Orders</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((c, i) => (
              <tr key={i}>
                <td>{c.time}</td>
                <td>{c.orders}</td>
                {/* Sửa dòng này */}
                <td>{c.revenue.toLocaleString('vi-VN')} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="orders-table">
        <h3>Danh sách đơn hàng</h3>
        <div className="filters">
          <input
            placeholder="Tìm kiếm theo mã hoặc khách hàng..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="approved">Hoàn thành</option>
            <option value="rejected">Đã hủy</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Khách hàng</th>
              <th>Ngày</th>
              <th>Số lượng</th>
              <th>Giá trị</th>
              <th>Trạng thái</th>
              <th>Xem</th>
            </tr>
          </thead>
          {/* Tìm đến phần tbody của bảng đơn hàng */}
          <tbody>
            {paginatedOrders.map(o => (
              <tr key={o.id}>
                <td>{o.orderCode}</td>
                <td>{o.customer}</td>
                <td>{o.date}</td>
                <td>{o.items}</td>
                {/* Sửa dòng này */}
                <td>{o.amount.toLocaleString('vi-VN')} đ</td>
                <td className={getStatusClass(o.status)}>
                  {o.status === "approved" || o.status === "1" ? "Hoàn thành" : 
                  o.status === "pending" || o.status === "0" ? "Chờ xử lý" : "Đã hủy"}
                </td>
                <td>
                  <button onClick={() => navigate(`/admin/orders/${o.id}`)} className="view-btn">
                    <Eye size={20} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={p === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
