import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "../page/AdminHeader";
import "./news.css";

function NewsManagement() {
  const navigate = useNavigate();

  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FORMAT DATE (GIỮ NGUYÊN) ================= */
  const formatDate = (d) => {
    if (!d) return "-";

    if (Array.isArray(d)) {
      return `${d[2]}/${d[1]}/${d[0]}`;
    }

    const date = new Date(d);
    return isNaN(date) ? "-" : date.toLocaleDateString("vi-VN");
  };

  /* ================= LOAD DATA (GIỮ NGUYÊN LOGIC) ================= */
  useEffect(() => {
    adminAxios
      .get("/news")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data;

        setNewsList(data || []);
      })
      .catch((err) => {
        console.error("Load news error:", err.response?.data);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= DELETE (GIỮ NGUYÊN LOGIC) ================= */
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tin này không?")) return;

    adminAxios
      .delete(`/news/${id}`)
      .then(() =>
        setNewsList((prev) => prev.filter((n) => n.id !== id))
      )
      .catch(() => alert("Xóa thất bại!"));
  };

  /* ================= SEARCH (GIỮ NGUYÊN) ================= */
  const filteredNews = newsList.filter((n) =>
    n.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <div style={{ height: 70 }} />

      <div className="news-container">
        {/* ===== HEADER ===== */}
        <div className="news-header">
          <h2>Quản lý Tin tức</h2>

          <div className="news-header-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/admin/news/add")}
            >
              + Thêm Tin tức
            </button>

            <input
              className="news-search"
              placeholder="Tìm theo tiêu đề..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        {loading ? (
          <p>Đang tải...</p>
        ) : filteredNews.length === 0 ? (
          <p>Không có tin tức nào.</p>
        ) : (
          <table className="news-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Ngày đăng</th>
                <th>👁 Lượt xem</th>
                <th>❤️ Lượt thích</th>
                <th>💬 Bình luận</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredNews.map((n) => (
                <tr key={n.id}>
                  <td className="news-title" title={n.title}>
                    {n.title}
                  </td>

                  <td>{formatDate(n.createdAt)}</td>

                  <td className="text-center">
                    {n.viewCount ?? 0}
                  </td>

                  <td className="text-center">
                    {n.likeCount ?? 0}
                  </td>

                  <td className="text-center">
                    {n.commentCount ?? 0}
                  </td>

                  <td className="news-actions">
                    <button
                      className="btn-edit"
                      onClick={() =>
                        navigate(`/admin/news/edit/${n.id}`)
                      }
                    >
                      Sửa
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(n.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default NewsManagement;
