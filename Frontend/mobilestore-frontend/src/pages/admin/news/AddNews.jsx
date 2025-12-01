import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "../../../components/Button";
import "./news.css";

function AddNews() {
  const [topic, setTopic] = useState(""); // chủ đề/ý tưởng từ người dùng
  const [news, setNews] = useState({ title: "", content: "", author: "" });
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();

  // Lưu news
  const handleAdd = () => {
    if (!news.title || !news.content) {
      alert("Vui lòng nhập đủ Tiêu đề và Nội dung!");
      return;
    }

    axios.post("/news", news)
      .then(() => {
        alert("Thêm tin tức thành công!");
        navigate("/admin/news");
      })
      .catch(err => console.error(err));
  };

  // Gọi AI tạo news theo topic
  const handleGenerateAI = async () => {
    if(!topic) {
      alert("Vui lòng nhập chủ đề trước khi tạo AI!");
      return;
    }
    try {
      setLoadingAI(true);
      // Gửi topic lên backend để AI tạo title + content
      const res = await axios.post("/news/ai-generate", { topic });
      // backend trả về { title, content }
      setNews(prev => ({ ...prev, title: res.data.title, content: res.data.content }));
    } catch (err) {
      console.error(err);
      alert("AI tạo bài viết thất bại!");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="news-add-container">
      <h2 className="news-add-header">Thêm Tin tức</h2>

      <div className="news-add-form">
        {/* Ô chủ đề/ý tưởng */}
        <div className="form-group">
          <label>Chủ đề / Ý tưởng</label>
          <input
            type="text"
            placeholder="Ví dụ: Giảm giá ngày sinh nhật"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Tiêu đề</label>
          <input
            type="text"
            placeholder="Nhập tiêu đề..."
            value={news.title}
            onChange={e => setNews({ ...news, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Nội dung</label>
          <textarea
            placeholder="Nhập nội dung tin tức..."
            value={news.content}
            onChange={e => setNews({ ...news, content: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Người đăng</label>
          <input
            type="text"
            placeholder="Tên người đăng..."
            value={news.author}
            onChange={e => setNews({ ...news, author: e.target.value })}
          />
        </div>

        <div className="form-actions">
          
          <Button onClick={handleGenerateAI} style={{ background: "#17a2b8" }}>
            {loadingAI ? "Đang tạo..." : "Tạo bằng AI"}
          </Button>

          <Button onClick={handleAdd}>Thêm Tin tức</Button>
          <Button onClick={() => navigate("/admin/news")} style={{ background: "#6c757d" }}>Hủy</Button>
        </div>
      </div>
    </div>
  );
}

export default AddNews;
