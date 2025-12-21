import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import PageHeader from "../components/page/PageHeader";
import { Calendar, User, Heart, MessageCircle, ArrowLeft, Share2, Send } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { DataContext } from "../DataContext";
import "../css/page/NewsDetailPage.css";

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const [news, setNews] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Load chi tiết bài viết
    axios.get(`http://localhost:8080/api/news/${id}`).then(res => setNews(res.data));
    // Load lượt like & comment (nếu backend đã hỗ trợ các endpoint này)
    axios.get(`http://localhost:8080/api/news/${id}/likes`).then(res => setLikes(res.data)).catch(() => {});
    axios.get(`http://localhost:8080/api/news/${id}/comments`).then(res => setComments(res.data)).catch(() => {});
  }, [id]);

  const handleLike = () => {
    if (!user) return alert("Bạn cần đăng nhập để thích bài viết!");
    axios.post(`http://localhost:8080/api/news/${id}/like/${user.id}`).then(res => {
      setLiked(res.data);
      axios.get(`http://localhost:8080/api/news/${id}/likes`).then(r => setLikes(r.data));
    });
  };

  const handleComment = () => {
    if (!user) return alert("Bạn cần đăng nhập để bình luận!");
    if (!newComment.trim()) return;

    axios.post("http://localhost:8080/api/news/comment", { 
      newsId: id, 
      userId: user.id, 
      content: newComment 
    })
    .then(res => {
      setComments(prev => [res.data, ...prev]);
      setNewComment("");
    });
  };

  if (!news) return <div className="loading">Đang tải bài viết...</div>;

  return (
    <div className="news-detail-wrapper">
      <PageHeader />
      <main className="news-detail-container">
        <div className="detail-actions-top">
          <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /> Quay lại</button>
          <button className="share-btn"><Share2 size={18} /> Chia sẻ</button>
        </div>

        <header className="detail-header">
          <h1 className="detail-title">{news.title}</h1>
          <div className="detail-meta">
            <div className="meta-item"><User size={16} /> <span>{news.author || "Admin"}</span></div>
            <div className="meta-item"><Calendar size={16} /> <span>{new Date(news.createdAt).toLocaleDateString("vi-VN")}</span></div>
            <div className="meta-item"><MessageCircle size={16} /> <span>{comments.length} bình luận</span></div>
          </div>
        </header>

        <article className="detail-article-body">
          <div className="rich-text-content">{parse(news.content)}</div>
        </article>

        <section className="detail-interaction">
          <button className={`like-button-big ${liked ? 'active' : ''}`} onClick={handleLike}>
            <Heart size={24} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "currentColor"} />
            <span>{liked ? "Đã thích" : "Yêu thích"}</span>
            <span className="like-count">{likes}</span>
          </button>
        </section>

        <section className="detail-comments-section">
          <h3>Thảo luận ({comments.length})</h3>
          <div className="comment-input-box">
            <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Viết bình luận..." rows={3}/>
            <button className="send-comment-btn" onClick={handleComment}><Send size={18} /> Gửi</button>
          </div>
          <div className="comment-list-modern">
            {comments.map(c => (
              <div key={c.id} className="modern-comment-item">
                <div className="comment-avatar">{c.username?.charAt(0) || "U"}</div>
                <div className="comment-content-main">
                  <div className="comment-user-info">
                    <span className="user-name">{c.username}</span>
                    <span className="comment-date">
                    {c.createdAt ? (
                        // Kiểm tra xem date có hợp lệ không trước khi format
                        !isNaN(new Date(c.createdAt).getTime()) ? (
                        formatDistanceToNow(new Date(c.createdAt), { addSuffix: true, locale: vi })
                        ) : (
                        "Ngày không xác định"
                        )
                    ) : (
                        "Vừa xong"
                    )}
                    </span>                  
                  </div>
                  <p>{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}