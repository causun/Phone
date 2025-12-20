import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { Button } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import "./news.css";

function AddNews() {
  const [topic, setTopic] = useState("");
  const [news, setNews] = useState({ title: "", content: "", author: "King Mobile" });
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();

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

  const handleGenerateAI = async () => {
  if (!topic) {
    alert("Vui lòng nhập chủ đề trước khi tạo AI!");
    return;
  }
  try {
    setLoadingAI(true);
    const res = await axios.post("/news/ai-generate", { topic });
    setNews(prev => ({
      ...prev,
      title: res.data.title,
      content: res.data.content
    }));
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
          <RichTextEditor
            value={news.content}
            onChange={(value) => setNews({ ...news, content: value })}
            style={{ minHeight: 300, marginBottom: 20 }}
          />
        </div>

        <div className="form-actions">
          <Button color="blue" onClick={handleGenerateAI} loading={loadingAI}>
            Tạo bằng AI
          </Button>
          <Button color="green" onClick={handleAdd} style={{ marginLeft: 10 }}>
            Thêm Tin tức
          </Button>
          <Button color="gray" onClick={() => navigate("/admin/news")} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNews;
