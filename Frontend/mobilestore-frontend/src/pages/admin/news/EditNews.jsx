import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "../../../components/Button";
import "./news.css";

function EditNews() {
  const { id } = useParams();
  const [news, setNews] = useState({ title: "", content: "", author: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/news/${id}`)
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = () => {
    if (!news.title || !news.content) {
      alert("Vui lòng nhập đủ Tiêu đề và Nội dung!");
      return;
    }

    axios.put(`/news/${id}`, news)
      .then(() => {
        alert("Cập nhật thành công!");
        navigate("/admin/news");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="news-add-container">
      <h2 className="news-add-header">Chỉnh sửa Tin tức</h2>

      <div className="news-add-form">
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
          <Button onClick={handleUpdate}>Lưu thay đổi</Button>
          <Button onClick={() => navigate("/admin/news")} style={{ background: "#6c757d" }}>
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditNews;
