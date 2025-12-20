"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import parse from "html-react-parser";
import UserHeader from "../../components/UserHeader";
import UserFooter from "../../components/UserFooter";
import { Calendar, User, Heart, MessageCircle, ArrowLeft, Share2, Send } from "lucide-react";

import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

import "./styles/newsDetail.css";

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    // Load data
    axios.get(`/news/${id}?isAdmin=false`).then(res => setNews(res.data));
    axios.get(`/news/${id}/likes`).then(res => setLikes(res.data));
    axios.get(`/news/${id}/comments`).then(res => setComments(res.data));
  }, [id]);

  const handleLike = () => {
    if (!userId) return alert("Bạn cần đăng nhập để thích bài viết!");
    axios.post(`/news/${id}/like/${userId}`).then(res => {
      setLiked(res.data);
      axios.get(`/news/${id}/likes`).then(r => setLikes(r.data));
    });
  };

  const handleComment = () => {
    if (!userId) return alert("Bạn cần đăng nhập để bình luận!");
    if (!newComment.trim()) return;

    axios.post("/news/comment", { newsId: id, userId, content: newComment })
      .then(res => {
        setComments(prev => [res.data, ...prev]);
        setNewComment("");
      });
  };

  if (!news) return <div className="loading-screen">Đang tải bài viết...</div>;

  return (
    <div className="news-detail-wrapper">
      <UserHeader />

      <main className="news-detail-container">
        {/* Nút quay lại & Share */}
        <div className="detail-actions-top">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Quay lại
          </button>
          <button className="share-btn">
            <Share2 size={18} /> Chia sẻ
          </button>
        </div>

        {/* Tiêu đề & Meta */}
        <header className="detail-header">
          <h1 className="detail-title">{news.title}</h1>
          <div className="detail-meta">
            <div className="meta-item">
              <User size={16} /> <span>{news.author || "Ban biên tập"}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} /> <span>{new Date(news.createdAt).toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="meta-item">
              <MessageCircle size={16} /> <span>{comments.length} bình luận</span>
            </div>
          </div>
        </header>

        {/* Nội dung bài viết */}
        <article className="detail-article-body">
          <div className="rich-text-content">
            {parse(news.content)}
          </div>
        </article>

        {/* Tương tác Like */}
        <section className="detail-interaction">
          <button 
            className={`like-button-big ${liked ? 'active' : ''}`} 
            onClick={handleLike}
          >
            <Heart size={24} fill={liked ? "#ef4444" : "none"} color={liked ? "#ef4444" : "currentColor"} />
            <span>{liked ? "Bạn đã thích bài viết" : "Yêu thích bài viết"}</span>
            <span className="like-count">{likes}</span>
          </button>
        </section>

        {/* Khu vực bình luận */}
        <section className="detail-comments-section">
          <div className="comments-header">
            <h3>Thảo luận ({comments.length})</h3>
          </div>

          <div className="comment-input-box">
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Chia sẻ ý kiến của bạn về bài viết..."
              rows={3}
            />
            <button className="send-comment-btn" onClick={handleComment}>
              <Send size={18} /> Gửi bình luận
            </button>
          </div>

          <div className="comment-list-modern">
            {comments.length > 0 ? (
              comments.map(c => (
                <div key={c.id} className="modern-comment-item">
                  <div className="comment-avatar">
                    {c.username ? c.username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="comment-content-main">
                    <div className="comment-user-info">
                      <span className="user-name">{c.username || `Người dùng #${c.userId}`}</span>
                      <span className="comment-date">
                        {c.createdAt ? 
                          formatDistanceToNow(new Date(c.createdAt), { addSuffix: true, locale: vi }) : 
                          "Vừa xong"
                        }
                      </span>
                    </div>
                    <p className="comment-text">{c.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-comments">Hãy là người đầu tiên bình luận bài viết này!</div>
            )}
          </div>
        </section>
      </main>

      <UserFooter />
    </div>
  );
}

export default NewsDetail;