"use client";

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import UserFooter from "../../components/UserFooter";
import "./styles/news.css";
import { Calendar, User, Eye, ArrowRight, TrendingUp } from "lucide-react";

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
    axios.get("/news")
      .then((res) => {
        const sortedNews = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNewsList(sortedNews);
        setFeaturedNews(sortedNews.slice(0, 3));
      })
      .catch((err) => console.error("Lỗi load tin tức:", err));
  }, []);

  return (
    <div className="news-container">
      <UserHeader />

      <main className="news-content-wrapper">
        {/* ===== HERO SECTION ===== */}
        <section className="news-hero-modern">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-text">
              <span className="badge-tech"><TrendingUp size={14}/> Tin công nghệ 2025</span>
              <h1>Blog & Tin Tức <br/><span>Mobile Store</span></h1>
              <p>Nơi cập nhật những xu hướng smartphone mới nhất, đánh giá chi tiết và các chương trình ưu đãi đặc quyền.</p>
            </div>
          </div>
        </section>

        {/* ===== FEATURED SECTION ===== */}
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2>Bài viết tâm điểm</h2>
              <div className="line"></div>
            </div>
            
            <div className="featured-grid-modern">
              {featuredNews.map((news, index) => (
                <div 
                  key={news.id} 
                  className={`featured-item item-${index}`}
                  onClick={() => navigate(`/user/news/${news.id}`)}
                >
                  <div className="featured-card-content">
                    <div className="card-meta">
                      <span><Calendar size={14}/> {new Date(news.createdAt).toLocaleDateString("vi-VN")}</span>
                      <span><Eye size={14}/> {news.views}</span>
                    </div>
                    <h3>{news.title}</h3>
                    <p>{stripHtml(news.content).slice(0, index === 0 ? 180 : 80)}...</p>
                    <button className="read-more-btn">Đọc bài viết <ArrowRight size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ALL NEWS GRID ===== */}
        <section className="all-news-section">
          <div className="container">
            <div className="section-header">
              <h2>Tất cả bài viết</h2>
            </div>

            <div className="modern-news-grid">
              {newsList.map((news) => (
                <article key={news.id} className="modern-news-card" onClick={() => navigate(`/user/news/${news.id}`)}>
                  <div className="card-image-placeholder">
                    {/* Nếu bạn có trường news.image, hãy thay vào đây */}
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-body">
                    <div className="card-info">
                      <span className="author"><User size={14}/> {news.author || 'Admin'}</span>
                      <span className="date">{new Date(news.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <h3 className="card-title">{news.title}</h3>
                    <p className="card-excerpt">{stripHtml(news.content).slice(0, 100)}...</p>
                    <div className="card-footer">
                      <span className="views"><Eye size={14}/> {news.views} lượt xem</span>
                      <ArrowRight className="arrow-icon" size={18}/>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {newsList.length === 0 && <div className="empty-news">Hiện chưa có bài viết nào mới.</div>}
          </div>
        </section>
      </main>

      <UserFooter />
    </div>
  );
}

export default NewsUser;