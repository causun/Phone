import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from "../../api/adminAxios";

import AdminHeader from "../page/AdminHeader";
import "./add.css";

function AddNews() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [news, setNews] = useState({
    title: "",
    content: "",
    author: "King Mobile",
  });

  const [loadingAI, setLoadingAI] = useState(false);

  /* ================= ADD NEWS ================= */
  const handleAdd = async () => {
    if (!news.title.trim() || !news.content.trim()) {
      alert("Vui lòng nhập đủ Tiêu đề và Nội dung!");
      return;
    }

    try {
      await adminAxios.post("/news", news);
      alert("Thêm tin tức thành công!");
      navigate("/admin/news");
    } catch (err) {
      console.error("Add news error:", err.response?.data);
      alert("Thêm tin tức thất bại!");
    }
  };

  /* ================= AI GENERATE ================= */
  const handleGenerateAI = async () => {
    if (!topic.trim()) {
      alert("Vui lòng nhập chủ đề trước khi tạo AI!");
      return;
    }

    try {
      setLoadingAI(true);

      const res = await adminAxios.post("/news/ai-generate", {
        topic: topic.trim(),
      });

      setNews((prev) => ({
        ...prev,
        title: res.data?.title || "",
        content: res.data?.content || "",
      }));
    } catch (err) {
      console.error("AI error:", err.response?.data || err.message);
      alert("AI tạo bài viết thất bại!");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <div style={{ height: 70 }} />

      <div className="news-add-container">
        <h2 className="news-add-header">Thêm Tin tức</h2>

        <div className="news-add-form">
          {/* ===== TOPIC ===== */}
          <div className="form-group">
            <label>Chủ đề / Ý tưởng</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ví dụ: Giảm giá ngày sinh nhật"
            />
          </div>

          {/* ===== TITLE ===== */}
          <div className="form-group">
            <label>Tiêu đề</label>
            <input
              type="text"
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

          {/* ===== ACTIONS ===== */}
          <div className="form-actions">
            <button
              className="btn-primary"
              onClick={handleGenerateAI}
              disabled={loadingAI}
            >
              {loadingAI ? "Đang tạo..." : "Tạo bằng AI"}
            </button>

            <button className="btn-success" onClick={handleAdd}>
              Thêm Tin tức
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

export default AddNews;
