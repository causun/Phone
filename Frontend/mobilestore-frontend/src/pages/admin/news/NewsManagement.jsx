import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import Button from "../../../components/Button";
import "./news.css";

function NewsManagement() {
  const [newsList, setNewsList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadNews = () => {
    axios.get("/news")
      .then(res => setNewsList(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { loadNews(); }, []);

  const handleDelete = (id) => {
    if(!window.confirm("Bạn có chắc muốn xóa tin này không?")) return;
    axios.delete(`/news/${id}`)
      .then(() => loadNews())
      .catch(err => console.error(err));
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h2>Quản lý Tin tức</h2>
        <div>
          <Button onClick={() => navigate("/admin/news/add")}>Thêm Tin tức</Button>
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
            <th className="col-author">Người đăng</th>
            <th className="col-action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList
            .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
            .map(n => (
            <tr key={n.id}>
              <td className="col-title" title={n.title}>{n.title}</td>
              <td className="col-content" title={n.content}>{n.content}</td>
              <td className="col-date">{new Date(n.createdAt).toLocaleDateString()}</td>
              <td className="col-author">{n.author || "—"}</td>
              <td className="col-action">
                <Button onClick={() => navigate(`/admin/news/edit/${n.id}`)}>Sửa</Button>
                <Button onClick={() => handleDelete(n.id)} style={{background:'#e74c3c'}}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default NewsManagement;
