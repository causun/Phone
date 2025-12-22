import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from "../../api/adminAxios";
import AdminHeader from "../page/AdminHeader";
import "./add.css";

function AddNews() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Lưu file ảnh
  const [preview, setPreview] = useState(null); // Hiển thị xem trước
  const [news, setNews] = useState({
    title: "",
    content: "",
    author: "King Mobile",
  });
  const [loadingAI, setLoadingAI] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async () => {
      // 1. Kiểm tra Tiêu đề
      if (!news.title || !news.title.trim()) {
        alert("Vui lòng nhập Tiêu đề bài viết!");
        return;
      }

      // 2. Kiểm tra Ảnh đại diện
      if (!selectedImage) {
        alert("Vui lòng chọn Ảnh đại diện cho bài viết!");
        return;
      }

      // 3. Kiểm tra Nội dung
      if (!news.content || !news.content.trim()) {
        alert("Vui lòng nhập Nội dung bài viết!");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("title", news.title.trim());
        formData.append("content", news.content.trim());
        formData.append("author", news.author);
        formData.append("image", selectedImage); // Chắc chắn có vì đã check ở trên

        await adminAxios.post("/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Thêm tin tức thành công!");
        navigate("/admin/news");
      } catch (err) {
        console.error(err);
        alert("Thêm tin tức thất bại! Vui lòng thử lại.");
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
          <h2 className="news-add-header">Thêm Tin tức mới</h2>
          <div className="news-add-form">
            
            {/* ẢNH ĐẠI DIỆN */}
            <div className="form-group">
              <label>Ảnh đại diện <span style={{color: 'red'}}>*</span></label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className={!selectedImage ? "input-error" : ""} 
              />
              {preview && (
                <div className="image-preview-wrapper">
                  <img src={preview} alt="Preview" style={{ width: 150, borderRadius: 8, marginTop: 10, border: '1px solid #ddd' }} />
                </div>
              )}
            </div>
            
            {/* CHỦ ĐỀ AI */}
            <div className="form-group">
              <label>Chủ đề / Ý tưởng (Dành cho AI)</label>
              <div className="ai-input-group" style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    style={{ flex: 1 }}
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)} 
                    placeholder="Ví dụ: Đánh giá iPhone 15 Pro Max sau 6 tháng..." 
                  />
                  <button 
                    type="button"
                    className="btn-primary" 
                    onClick={handleGenerateAI} 
                    disabled={loadingAI || !topic.trim()}
                  >
                    {loadingAI ? "Đang tạo..." : "Tạo bằng AI"}
                  </button>
              </div>
            </div>

            <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

            {/* TIÊU ĐỀ */}
            <div className="form-group">
              <label>Tiêu đề bài viết <span style={{color: 'red'}}>*</span></label>
              <input 
                type="text" 
                value={news.title} 
                onChange={(e) => setNews({ ...news, title: e.target.value })} 
                placeholder="Nhập tiêu đề hấp dẫn..."
              />
            </div>

            {/* NỘI DUNG */}
            <div className="form-group">
              <label>Nội dung chi tiết <span style={{color: 'red'}}>*</span></label>
              <textarea 
                rows={12} 
                value={news.content} 
                onChange={(e) => setNews({ ...news, content: e.target.value })} 
                placeholder="Nội dung bài viết (hỗ trợ HTML nếu dùng thư viện editor)..."
              />
            </div>

            {/* ACTIONS */}
            <div className="form-actions" style={{ marginTop: '30px' }}>
              <button className="btn-success" onClick={handleAdd} style={{ padding: '12px 25px', fontWeight: 'bold' }}>
                Xuất bản bài viết
              </button>
              <button className="btn-cancel" onClick={() => navigate("/admin/news")}>
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </>
    );
}
export default AddNews;