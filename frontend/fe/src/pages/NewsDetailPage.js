import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import PageHeader from "../components/page/PageHeader";
import { Calendar, User, Heart, MessageCircle, ArrowLeft, Share2, Send, TrendingUp, Eye } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { DataContext } from "../DataContext";
import "../css/page/NewsDetailPage.css";

// Hàm parseDate dùng chung từ NewsPage để tránh lỗi định dạng mảng của Spring
const safeParseDate = (value) => {
  if (!value) return null;
  if (Array.isArray(value)) {
    const [y, m, d, h = 0, min = 0, s = 0] = value;
    return new Date(y, m - 1, d, h, min, s);
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

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
    axios.get(`http://localhost:8080/api/news/${id}`).then(res => setNews(res.data));
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
    // Tạo object bình luận mới có chứa đầy đủ thông tin user để hiển thị ngay
    const newCommentData = {
      ...res.data,
      fullName: user.fullName, // Lấy từ context
      avatar: user.avatar,     // Lấy từ context để hiện ảnh ngay
      createdAt: new Date()
    };
    
    setComments(prev => [newCommentData, ...prev]);
    setNewComment("");
  })
  .catch(err => console.error("Lỗi bình luận:", err));
};

  const renderAvatar = (name, url, size = 44) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "U";
    return (
      <div className="avatar-circle" style={{ 
        width: size, 
        height: size, 
        backgroundColor: url ? 'transparent' : '#3182ce',
        flexShrink: 0 
      }}>
        {url ? (
          <img src={url} alt={name} onError={(e) => { e.target.src = ""; e.target.parentElement.style.backgroundColor = "#3182ce"; }} />
        ) : (
          <span className="avatar-text-fallback">{firstLetter}</span>
        )}
      </div>
    );
  };

  if (!news) return <div className="loading-screen">Đang tải bài viết...</div>;

return (
    <div className="news-detail-wrapper">
      <PageHeader />
      
      {/* HERO SECTION */}
      <section className="detail-hero-section" style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${news.thumbnail || 'https://via.placeholder.com/1200x600'})`
      }}>
        <div className="container">
          <button className="back-btn-light" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Quay lại
          </button>
          <div className="hero-content-detail">
            <span className="badge-tech"><TrendingUp size={14}/> Tin công nghệ 2025</span>
            <h1 className="detail-title-main">{news.title}</h1>
            <div className="detail-meta-hero">
               <div className="meta-item"><User size={16} /> <span>{news.author || "Admin"}</span></div>
               <div className="meta-item"><Calendar size={16} /> <span>{safeParseDate(news.createdAt)?.toLocaleDateString("vi-VN")}</span></div>
               <div className="meta-item"><Eye size={16} /> <span>{news.views || 0} lượt xem</span></div>
            </div>
          </div>
        </div>
      </section>

      <main className="news-detail-container-modern">
        <article className="detail-article-body">
          <div className="rich-text-content">
            {parse(news.content)}
          </div>
        </article>

        <section className="detail-interaction-modern">
          <div className="interaction-divider"></div>
          <div className="interaction-stats">
            <div className="stat-item">
               <Heart size={18} fill="#ef4444" color="#ef4444" />
               <span><strong>{likes}</strong> người yêu thích</span>
            </div>
            <div className="stat-item">
               <MessageCircle size={18} color="#3182ce" />
               <span><strong>{comments.length}</strong> bình luận</span>
            </div>
          </div>
          
          <div className="interaction-btns">
            {/* NÚT TYM ĐÃ ĐƯỢC CHỈNH SỬA: Rõ ràng hơn, bỏ nút rỗng bên cạnh */}
            <button className={`like-btn-modern ${liked ? 'active' : ''}`} onClick={handleLike}>
              <Heart 
                size={22} 
                fill={liked ? "#ef4444" : "none"} 
                strokeWidth={2.5}
                color={liked ? "#ef4444" : "#4a5568"} 
              />
              <span>{liked ? "Yêu thích" : "Yêu thích"}</span>
            </button>
          </div>
        </section>

        <section className="detail-comments-section">
          <div className="section-header-small">
            <h3>Thảo luận sôi nổi</h3>
          </div>
          
          <div className="comment-input-area-modern">
            {/* SỬA: fullName thay vì fullname (dựa theo ProfilePage) */}
            {renderAvatar(user?.fullName, user?.avatar, 50)}
            <div className="input-wrapper">
              <textarea 
                value={newComment} 
                onChange={e => setNewComment(e.target.value)} 
                placeholder={user ? `Chào ${user.fullName || 'bạn'}, bạn nghĩ gì về bài này?` : "Đăng nhập để bình luận..."} 
                rows={2}
              />
              <button className="send-comment-btn" onClick={handleComment} disabled={!user}>
                <Send size={18} /> Gửi bình luận
              </button>
            </div>
          </div>

          <div className="comment-list-modern">
  {comments.map(c => {
    const cDate = safeParseDate(c.createdAt);
    
    // Ưu tiên lấy fullName từ các trường có thể có
    const commenterName = c.fullName || c.user?.fullName || c.username || "Người dùng";
    
    // QUAN TRỌNG: Kiểm tra tất cả các trường có thể chứa link ảnh
    const commenterAvatar = c.avatar || c.user?.avatar || c.userAvatar || c.user?.userAvatar;

    return (
      <div key={c.id} className="modern-comment-item">
        <div className="comment-avatar-wrapper">
          {/* Truyền commenterAvatar vào đây */}
          {renderAvatar(commenterName, commenterAvatar, 50)}
        </div>
        
        <div className="comment-content-main">
          <div className="comment-user-info">
            <div className="user-name">{commenterName}</div>
            <div className="comment-date">
              {cDate ? formatDistanceToNow(cDate, { addSuffix: true, locale: vi }) : "Vừa xong"}
            </div>
          </div>
          <p className="comment-text">{c.content}</p>
        </div>
      </div>
    );
  })}
</div>
        </section>
      </main>
    </div>
  );
}