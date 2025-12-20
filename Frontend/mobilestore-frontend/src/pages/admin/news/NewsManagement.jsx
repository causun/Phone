import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { ActionIcon, Button } from "@mantine/core";
import { Edit3, Trash2 } from "lucide-react";
import "./news.css";

function NewsManagement() {
  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadNews = () => {
    axios.get("/news")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNewsList(sorted);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { loadNews(); }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tin này không?")) return;
    axios.delete(`/news/${id}`)
      .then(() => loadNews())
      .catch(err => console.error(err));
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h2>Quản lý Tin tức</h2>
        <div className="news-header-actions">
          <Button color="blue" onClick={() => navigate("/admin/news/add")}>Thêm Tin tức</Button>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="news-search"
          />
        </div>
      </div>

      <table className="news-table">
        <thead>
          <tr>
            <th className="col-title">Tiêu đề</th>
            <th className="col-content">Nội dung</th>
            <th className="col-date">Ngày đăng</th>
            <th className="col-likes">Likes</th>
            <th className="col-comments">Comments</th>
            <th className="col-views">Lượt xem</th>
            <th className="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {newsList
            .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
            .map(n => (
              <tr key={n.id}>
                <td className="col-title">{n.title}</td>
                <td className="col-content">{n.content}</td>
                <td className="col-date">{new Date(n.createdAt).toLocaleDateString()}</td>
                <td className="col-likes">{n.likes || 0}</td>
                <td className="col-comments">{n.comments || 0}</td>
                <td className="col-views">{n.views || 0}</td>
                <td className="col-action">
                  {/* Thêm size="sm" để nút nhỏ gọn hơn, tránh bị tràn */}
                  <div className="action-buttons">
                    <ActionIcon size="sm" color="yellow" variant="light" onClick={() => navigate(`/admin/news/edit/${n.id}`)}>
                      <Edit3 size={16} />
                    </ActionIcon>
                    <ActionIcon size="sm" color="red" variant="light" onClick={() => handleDelete(n.id)}>
                      <Trash2 size={16} />
                    </ActionIcon>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewsManagement;