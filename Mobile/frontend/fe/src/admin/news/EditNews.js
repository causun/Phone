import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "../page/AdminHeader";
import "./edit.css";

function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState({
    title: "",
    content: "",
    author: "",
  });

  /* ================= LOAD DETAIL ================= */
  useEffect(() => {
    adminAxios
      .get(`/news/${id}?isAdmin=true`)
      .then((res) => {
        const data = res.data?.data || res.data;
        setNews({
          title: data.title || "",
          content: data.content || "",
          author: data.author || "",
        });
      })
      .catch((err) => {
        console.error("Load news error:", err.response?.data);
        // interceptor sẽ tự logout nếu 401
      });
  }, [id]);

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!news.title.trim() || !news.content.trim()) {
      alert("Vui lòng nhập đủ Tiêu đề và Nội dung!");
      return;
    }

    try {
      await adminAxios.put(`/news/${id}`, news);
      alert("Cập nhật thành công!");
      navigate("/admin/news");
    } catch (err) {
      console.error("Update error:", err.response?.data);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <>
      <AdminHeader />
      <div style={{ height: 70 }} />

      <div className="news-add-container">
        <h2 className="news-add-header">Chỉnh sửa Tin tức</h2>

        <div className="news-add-form">
          {/* ===== TITLE ===== */}
          <div className="form-group">
            <label>Tiêu đề</label>
            <input
              value={news.title}
              onChange={(e) =>
                setNews({ ...news, title: e.target.value })
              }
              placeholder="Nhập tiêu đề..."
            />
          </div>

          {/* ===== CONTENT ===== */}
          <div className="form-group">
            <label>Nội dung</label>
            <textarea
              rows={10}
              value={news.content}
              onChange={(e) =>
                setNews({ ...news, content: e.target.value })
              }
              placeholder="Nhập nội dung bài viết..."
            />
          </div>

          {/* ===== AUTHOR ===== */}
          <div className="form-group">
            <label>Người đăng</label>
            <input
              value={news.author}
              onChange={(e) =>
                setNews({ ...news, author: e.target.value })
              }
              placeholder="Tên người đăng..."
            />
          </div>

          {/* ===== ACTIONS ===== */}
          <div className="form-actions">
            <button className="btn-success" onClick={handleUpdate}>
              Lưu thay đổi
            </button>

            <button
              className="btn-cancel"
              onClick={() => navigate("/admin/news")}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditNews;
