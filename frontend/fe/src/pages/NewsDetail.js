"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { DataContext } from "../DataContext";

import PageHeader from "../components/page/PageHeader";
import "../css/news/newsDetail.css";

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(DataContext);
  const authToken = token || localStorage.getItem("trip-token");

  const authHeader = authToken
    ? { Authorization: `Bearer ${authToken}` }
    : {};

  /* ================= STATE ================= */
  const [user, setUser] = useState(null);
  const [news, setNews] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  /* ================= LOAD USER ================= */
  useEffect(() => {
    if (!authToken) {
      setUser(null);
      return;
    }

    axios
      .get("http://localhost:8080/api/auth/user/me", {
        headers: authHeader,
      })
      .then((res) => {
        const u = res?.data?.data ?? res?.data ?? null;
        setUser(u);
      })
      .catch(() => setUser(null));
  }, []);

  /* ================= LOAD NEWS + LIKE + COMMENT ================= */
  useEffect(() => {
    if (!id || isNaN(Number(id))) return;

    // news detail
    axios
      .get(`http://localhost:8080/api/news/${Number(id)}?isAdmin=false`)
      .then((res) => setNews(res.data))
      .catch(() => navigate("/"));

    // like count
    axios
      .get(`http://localhost:8080/api/news/${Number(id)}/likes`)
      .then((res) => setLikes(res.data));

    // comments
    axios
      .get(`http://localhost:8080/api/news/${Number(id)}/comments`)
      .then((res) => setComments(res.data));
  }, [id]);

  /* ================= LIKE ================= */
  const handleLike = async () => {
    if (!authToken || !user) {
      alert("Bạn cần đăng nhập để thích bài viết!");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/news/${Number(id)}/like/${Number(user.id)}`,
        {},
        { headers: authHeader }
      );

      // reload like count
      const likeRes = await axios.get(
        `http://localhost:8080/api/news/${Number(id)}/likes`
      );
      setLikes(likeRes.data);
    } catch (err) {
      console.error("LIKE ERROR:", err.response?.data || err.message);
    }
  };

  /* ================= COMMENT ================= */
  const handleComment = async () => {
    if (!authToken || !user) {
      alert("Bạn cần đăng nhập để bình luận!");
      navigate("/login");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/api/news/comment",
        {
          newsId: Number(id),
          userId: Number(user.id),
          content: newComment,
          parentId: null,
        },
        {
          headers: {
            ...authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(
        "COMMENT ERROR:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <PageHeader user={user} />

      {!news ? (
        <div className="loading">Đang tải...</div>
      ) : (
        <div className="news-detail container">
          <h1>{news.title}</h1>

          <div className="news-meta">
            <span>Tác giả: {news.author}</span> |{" "}
            <span>
              Ngày đăng:{" "}
              {news.createdAt &&
                new Date(news.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="news-content">{parse(news.content)}</div>

          {/* LIKE */}
          <div className="news-interact" style={{ marginTop: 20 }}>
            <button onClick={handleLike}>
              👍 Thích ({likes})
            </button>
          </div>

          {/* COMMENT */}
          <div className="news-comments" style={{ marginTop: 30 }}>
            <h3>Bình luận ({comments.length})</h3>

            <div className="add-comment">
              <textarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận..."
              />
              <button onClick={handleComment}>Gửi</button>
            </div>

            <div className="comment-list">
              {comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <b>{c.userName || `User ${c.userId}`}:</b> {c.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
    </>
  );
}

export default NewsDetail;
