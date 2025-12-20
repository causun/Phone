"use client";

import { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/page/PageHeader";

import "../css/news/news.css";

const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

function NewsUser() {
  const [newsList, setNewsList] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/news")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];

        const sortedNews = list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setNewsList(sortedNews);
        setFeaturedNews(sortedNews.slice(0, 3));
      })
      .catch((err) => console.error("Lỗi load tin tức:", err));
  }, []);

  return (
    <>
      <PageHeader />

      <div className="news-page">
        <section className="news-hero">
          <div className="news-hero-content">
            <div className="news-hero-badge">Tin Tức</div>
            <h1 className="news-hero-title">
              Cập Nhật Mới Nhất
              <br />
              Từ Cửa Hàng
            </h1>
            <p className="news-hero-subtitle">
              Khám phá những khuyến mãi hấp dẫn, xu hướng sản phẩm mới và những
              câu chuyện thú vị từ cộng đồng của chúng tôi
            </p>
          </div>
        </section>

        <section className="news-featured">
          <div className="container">
            <div className="news-featured-header">
              <h2>Bài Viết Nổi Bật</h2>
              <p>Những bài viết đáng chú ý nhất tuần này</p>
            </div>

            <div className="news-featured-grid">
              {featuredNews.map((news) => (
                <div
                  key={news.id}
                  className="news-featured-card"
                  onClick={() => navigate(`/news/${news.id}`)} // ✅ FIX ROUTE
                >
                  <h3 className="news-featured-title">{news.title}</h3>
                  <p className="news-featured-excerpt">
                    {news.content
                      ? stripHtml(news.content).slice(0, 200) + "..."
                      : ""}
                  </p>
                  <div className="news-featured-meta">
                    <span className="news-featured-author">
                      {news.author}
                    </span>
                    <span className="news-featured-date">
                      {news.createdAt &&
                        new Date(news.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="news-featured-views">
                      Views: {news.views || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TẤT CẢ BÀI VIẾT ===== */}
        <section className="news-grid-section">
          <div className="container">
            <h2>Tất Cả Bài Viết</h2>
            <div className="news-grid">
              {newsList.map((news) => (
                <div
                  key={news.id}
                  className="news-card"
                  onClick={() => navigate(`/news/${news.id}`)} // ✅ FIX ROUTE
                >
                  <h3 className="news-card-title">{news.title}</h3>
                  <p className="news-card-excerpt">
                    {news.content
                      ? stripHtml(news.content).slice(0, 150) + "..."
                      : ""}
                  </p>
                  <div className="news-card-meta">
                    <span className="news-card-author">{news.author}</span>
                    <span className="news-card-date">
                      {news.createdAt &&
                        new Date(news.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="news-card-views">
                      Views: {news.views || 0}
                    </span>
                  </div>
                </div>
              ))}

              {newsList.length === 0 && <p>Chưa có bài viết nào.</p>}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default NewsUser;
