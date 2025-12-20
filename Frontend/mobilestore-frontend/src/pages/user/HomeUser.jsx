"use client"

import { useState, useEffect, useContext } from "react";
import { ShoppingCart, Heart, ChevronRight, ArrowRight } from "lucide-react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import UserHeader from "../../components/UserHeader";
import UserFooter from "../../components/UserFooter";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import "./styles/home.css";

function HomeUser() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);

  // Cấu trúc banner mới với nội dung động
  const banners = [
    {
      img: "http://localhost:8081/uploads/banners/b1.JPG",
      subtitle: "XU THẾ CÔNG NGHỆ 2025",
      title: "Siêu phẩm Smartphone",
      desc: "Trải nghiệm sức mạnh đỉnh cao với chip xử lý thế hệ mới."
    },
    {
      img: "http://localhost:8081/uploads/banners/b2.JPG",
      subtitle: "ƯU ĐÃI ĐẶC BIỆT",
      title: "Thiết bị chính hãng",
      desc: "Ưu đãi giảm đến 60% trong các dịp SALE lớn."
    },
    {
      img: "http://localhost:8081/uploads/banners/b3.JPG",
      subtitle: "SANG TRỌNG & ĐẲNG CẤP",
      title: "Samsung Galaxy S25 Ultra",
      desc: "Dẫn đầu với Galaxy AI thông minh."
    }
  ];

  useEffect(() => {
    axios.get("/products")
      .then(res => {
        const prods = (res.data.content || []).map(p => ({
          ...p,
          mainImage: p.image ? `http://localhost:8081/uploads/products/${p.image}` : null
        }));
        setProducts(prods.reverse().slice(0, 8));
      })
      .catch(err => console.error(err));
    
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  }, []);

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    const updated = wishlist.some(i => i.id === product.id)
      ? wishlist.filter(i => i.id !== product.id)
      : [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + " ₫";

  return (
    <div className="home-container">
      <UserHeader />

      {/* --- BANNER SLIDER REDESIGNED --- */}
      <section className="hero-slider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect={'fade'}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
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
                    <span className="animate-sub">{item.subtitle}</span>
                    <h1 className="animate-title">{item.title}</h1>
                    <p className="animate-desc">{item.desc}</p>
                    {/* <button className="btn-buy-now animate-btn" onClick={() => navigate('/user/products')}>
                      Mua ngay ngay <ArrowRight size={20} />
                    </button> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="main-section">
        <div className="section-header">
          <h2>✨ Sản phẩm mới về</h2>
          <button className="btn-all" onClick={() => navigate('/user/products')}>
            Xem tất cả <ChevronRight size={16} />
          </button>
        </div>

        <div className="product-grid-home">
          {products.map(p => (
            <div key={p.id} className="product-card-user" onClick={() => navigate(`/user/product/${p.id}`)}>
              <div className="image-container">
                <img src={p.mainImage} alt={p.name} />
                <button 
                  className={`heart-btn ${wishlist.some(w => w.id === p.id) ? "active" : ""}`}
                  onClick={(e) => toggleWishlist(e, p)}
                >
                  <Heart size={20} fill={wishlist.some(w => w.id === p.id) ? "#ff4d4d" : "none"} />
                </button>
                <div className="new-badge">New</div>
              </div>
              
              <div className="product-details">
                <span className="brand-text">{p.category?.name || "Smartphone"}</span>
                <h3 className="name-text">{p.name}</h3>
                <div className="price-text">{formatPrice(p.price)}</div>
                
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p, 1);
                  alert("Đã thêm vào giỏ hàng!");
                }}>
                  <ShoppingCart size={18} /> Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <UserFooter />
    </div>
  );
}

export default HomeUser;