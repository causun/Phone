import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/page/PageHeader";
import { Calendar, User, Eye, ArrowRight, TrendingUp } from "lucide-react";
import "../css/page/NewsPage.css";

// Hàm loại bỏ thẻ HTML để hiển thị mô tả ngắn
const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const parseDate = (value) => {
  if (!value) return null;

  // Trường hợp Spring trả array: [year, month, day, hour, minute, second]
  if (Array.isArray(value)) {
    const [y, m, d, h = 0, min = 0, s = 0] = value;
    return new Date(y, m - 1, d, h, min, s);
  }

  // Trường hợp ISO string
  return new Date(value);
};

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/news")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : (res.data?.data || []);

        // TẤT CẢ BÀI VIẾT: ID GIẢM DẦN
        setNewsList(
          [...data].sort((a, b) => (b.id || 0) - (a.id || 0))
        );

        // BÀI VIẾT TÂM ĐIỂM: VIEW CAO NHẤT
        setFeaturedNews(
          [...data]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 3)
        );
      })
      .catch((err) => console.error("Lỗi load tin tức:", err));
  }, []);



  return (
    <div className="news-container">
      <PageHeader />

      <main className="news-content-wrapper">
        {/* ===== HERO SECTION ===== */}
        <section className="news-hero-modern">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-text">
              <span className="badge-tech"><TrendingUp size={14}/> Tin công nghệ 2025</span>
              <h1>Blog & Tin Tức <br/><span>Mobile Store</span></h1>
              <p>Nơi cập nhật những xu hướng smartphone mới nhất và các chương trình ưu đãi đặc quyền.</p>
            </div>
          </div>
        </section>

        {/* ===== FEATURED SECTION ===== */}
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2>Bài viết tâm điểm</h2>
            </div>
            
            <div className="featured-grid-modern">
              {featuredNews.map((news, index) => (
                <div 
                  key={news.id} 
                  className={`featured-item item-${index}`}
                  onClick={() => navigate(`/news/${news.id}`)}
                  // THÊM STYLE BACKGROUND Ở ĐÂY
                  style={{ 
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${news.thumbnail || 'https://via.placeholder.com/800x600'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="featured-card-content">
                    <div className="card-meta">
                      <span><Calendar size={14}/> {parseDate(news.createdAt)?.toLocaleDateString("vi-VN")}</span>
                      <span><Eye size={14}/> {news.views || 0}</span>
                    </div>
                    <h3 className="featured-title-text">{news.title}</h3>
                    {/* Chỉ hiện mô tả ở bài viết lớn (item-0) để tránh chật chội */}
                    {index === 0 && <p>{stripHtml(news.content).slice(0, 100)}...</p>}
                    <button className="read-more-btn">Đọc bài <ArrowRight size={14}/></button>
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
                <article key={news.id} className="modern-news-card" onClick={() => navigate(`/news/${news.id}`)}>
  <div className="card-image-placeholder">
    {news.thumbnail ? (
      <img src={news.thumbnail} alt={news.title} />
    ) : (
      <div className="no-image">No Image</div>
    )}
    {/* Overlay nằm trong container ảnh */}
    <div className="image-overlay"></div> 
  </div>

  <div className="card-body">
    {/* Giữ nguyên card-info, title, excerpt */}
    <div className="card-info">
      <span className="author"><User size={14}/> {news.author || 'Admin'}</span>
      <span className="date">{parseDate(news.createdAt)?.toLocaleDateString("vi-VN")}</span>
    </div>
    <h3 className="card-title">{news.title}</h3>
    <p className="card-excerpt">{stripHtml(news.content).slice(0, 90)}...</p>
    
    <div className="card-footer">
      <span className="views"><Eye size={14}/> {news.views || 0} lượt xem</span>
      <ArrowRight className="arrow-icon" size={20}/>
    </div>
  </div>
</article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}