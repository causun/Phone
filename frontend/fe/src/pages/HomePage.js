import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";
import PageHeader from "../components/page/PageHeader";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Banner
import banner1 from "../images/slides/b1.jpg";
import banner2 from "../images/slides/b2.jpg";
import banner3 from "../images/slides/b3.jpg";

import "../css/page/HomePage.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Lấy dữ liệu tập trung từ DataContext
  const { user, token, fetchCart } = useContext(DataContext);

  const banners = [
    {
      img: banner1,
      subtitle: "XU THẾ CÔNG NGHỆ 2025",
      title: "Siêu phẩm Smartphone",
      desc: "Trải nghiệm sức mạnh đỉnh cao với chip xử lý thế hệ mới."
    },
    {
      img: banner2,
      subtitle: "ƯU ĐÃI ĐẶC BIỆT",
      title: "Thiết bị chính hãng",
      desc: "Ưu đãi giảm đến 60% trong các dịp SALE lớn."
    },
    {
      img: banner3,
      subtitle: "SANG TRỌNG & ĐẲNG CẤP",
      title: "Samsung Galaxy S25 Ultra",
      desc: "Dẫn đầu với Galaxy AI thông minh."
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        const list = (res.data?.data || []).filter((p) => p.status === "ACTIVE");
        setProducts(list.reverse().slice(0, 8));
      })
      .catch((err) => console.error("Lỗi kết nối API:", err));
  }, []);

const addToCart = async (product) => {
  if (!user) { 
    alert("Bạn cần đăng nhập để thêm vào giỏ!"); // Thêm thông báo này
    navigate("/login"); 
    return; 
  }
  
  if (product.quantityInStock === 0) {
    alert("Sản phẩm đã hết hàng!");
    return;
  }

  try {
    await axios.post(
      `http://localhost:8080/api/cart/add?productId=${product.id}&quantity=1`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart(); 
    alert("Đã thêm vào giỏ hàng 🛒");
  } catch (err) {
    alert("Không thể thêm vào giỏ hàng!");
  }
};

  return (
    <div className="home-container">
      <PageHeader />

      <section className="hero-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect={'fade'}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="mySwiper"
        >
          {banners.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="slide-item">
                <img src={item.img} alt={item.title} />
                <div className="slide-overlay">
                  <div className="slide-content">
                    <span className="animate-sub">
                      {user ? `Xin chào, ${user.fullName}` : "Chào mừng bạn đến với MobileStore"}
                    </span>
                    <h1 className="animate-title">{item.title}</h1>
                    <p className="animate-desc">{item.desc}</p>
                    <button className="btn-buy-now" onClick={() => navigate('/products')}>
                      Mua ngay <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="main-section">
        <div className="section-header">
          <h2>✨ Sản phẩm mới về</h2>
          <button className="btn-all" onClick={() => navigate('/products')}>
            Xem tất cả <ChevronRight size={16} />
          </button>
        </div>

        <div className="hp-grid">
          {products.map((p) => (
            <div key={p.id} className="hp-card">
              <div className="hp-img-wrap">
                {p.quantityInStock === 0 && <div className="hp-out-stock">HẾT HÀNG</div>}
                <img
                  src={p.imageUrls?.[0]}
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.id}`)}
                />
              </div>

              <div className="hp-info">
                <span className="hp-brand">{p.brand?.name}</span>
                <h3 onClick={() => navigate(`/product/${p.id}`)}>{p.name}</h3>
                <div className="hp-rating">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={i <= Math.round(p.avgRating || 0) ? "star active" : "star"}>★</span>
                  ))}
                  <span className="rating-text">({p.totalReviews || 0})</span>
                </div>
                <p className="hp-price">{p.price.toLocaleString()} ₫</p>

                <div className="hp-btn-row">
                  <button
                    className="btn-add-main"
                    disabled={p.quantityInStock === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    <ShoppingCart size={18} /> Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}