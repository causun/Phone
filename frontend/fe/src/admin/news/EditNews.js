import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "../page/AdminHeader";
import "./edit.css";

function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [news, setNews] = useState({ title: "", content: "", author: "", thumbnail: "" });

  /* ================= LOAD DETAIL ================= */
  useEffect(() => {
    adminAxios.get(`/news/${id}?isAdmin=true`).then((res) => {
      const data = res.data?.data || res.data;
      setNews(data);
      if (data.thumbnail) setPreview(data.thumbnail); // Hiển thị ảnh cũ
    });
  }, [id]);

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", news.title);
      formData.append("content", news.content);
      formData.append("author", news.author);
      if (selectedImage) formData.append("image", selectedImage);

      await adminAxios.put(`/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cập nhật thành công!");
      navigate("/admin/news");
    } catch (err) {
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

          {/* ===== Image ===== */}
          <div className="form-group">
            <label>Thay đổi ảnh đại diện</label>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImage(file);
              setPreview(URL.createObjectURL(file));
            }} />
            {preview && <img src={preview} alt="Preview" style={{ width: 150, marginTop: 10 }} />}
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
             <button className="btn-success" onClick={handleUpdate}>Lưu thay đổi</button>
             <button className="btn-cancel" onClick={() => navigate("/admin/news")}>Hủy</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditNews;
