import React, { useEffect, useState, useContext } from "react";
import axios from "axios"; // Dùng axios trực tiếp giống trang Product
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

//Banner
import banner1 from "../images/slides/b1.jpg";
import banner2 from "../images/slides/b2.jpg";
import banner3 from "../images/slides/b3.jpg";

import "../css/page/HomePage.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { user, token } = useContext(DataContext);
  const navigate = useNavigate();

  // 1. Cấu hình Banner (Bạn có thể sửa URL ảnh theo máy bạn)
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
  
  // 2. Load sản phẩm (Cách viết giống hệt trang Product của bạn)
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products") // Đảm bảo đúng cổng backend 8080
      .then((res) => {
        const list = (res.data?.data || []).filter(
          (p) => p.status === "ACTIVE"
        );
        // Lấy 8 sản phẩm mới nhất
        setProducts(list.reverse().slice(0, 8));
      })
      .catch((err) => {
        console.error("Lỗi kết nối API:", err);
      });
  }, []);

  // 3. Logic thêm vào giỏ hàng (Giống hệt trang Product của bạn)
  const addToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const key = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];

    const found = cart.find((i) => i.id === product.id);
    if (found) {
      found.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrls: product.imageUrls,
      });
    }

    localStorage.setItem(key, JSON.stringify(cart));
    // Kích hoạt event để Header cập nhật số lượng
    window.dispatchEvent(new Event("storage"));
    alert("Đã thêm vào giỏ hàng 🛒");
  };

  return (
    <div className="home-container">
      <PageHeader />

      {/* --- HERO SLIDER --- */}
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

      {/* --- PRODUCT GRID --- */}
      <section className="main-section">
        <div className="section-header">
          <h2>✨ Sản phẩm mới về</h2>
          <button className="btn-all" onClick={() => navigate('/products')}>
            Xem tất cả <ChevronRight size={16} />
          </button>
        </div>

        <div className="product-grid-home">
          {products.map((p) => (
            <div key={p.id} className="product-card-user" onClick={() => navigate(`/product/${p.id}`)}>
              <div className="image-container">
                <img src={p.imageUrls?.[0]} alt={p.name} />
                <div className="new-badge">New</div>
              </div>
              
              <div className="product-details">
                <span className="brand-text">{p.brand?.name}</span>
                <h3 className="name-text">{p.name}</h3>
                <div className="price-text">{p.price.toLocaleString()} ₫</div>
                
                <button className="add-to-cart-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart(p);
                }}>
                  <ShoppingCart size={18} /> Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}