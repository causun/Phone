import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { Button } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import "./news.css";

function EditNews() {
  const { id } = useParams();
  const [news, setNews] = useState({ title: "", content: "", author: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/news/${id}?isAdmin=true`)
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
          <RichTextEditor
            value={news.content}
            onChange={value => setNews({ ...news, content: value })}
            style={{ minHeight: 300, marginBottom: 20 }}
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
          <Button color="green" onClick={handleUpdate}>Lưu thay đổi</Button>
          <Button color="gray" onClick={() => navigate("/admin/news")} style={{ marginLeft: 10 }}>
            Hủy
          </Button>
        </div>

      </div>
    </div>
  );
}

export default EditNews;
