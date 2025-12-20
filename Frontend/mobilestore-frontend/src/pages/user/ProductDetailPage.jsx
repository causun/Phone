"use client"

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import UserHeader from "../../components/UserHeader";
import UserFooter from "../../components/UserFooter";
import { ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { CartContext } from "../../context/CartContext"; // Sử dụng context thay vì tự set localStorage
import "./styles/productdetail.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào chi tiết
    axios.get(`/products/${id}`)
      .then(res => {
        const p = res.data;
        p.mainImage = p.image ? `http://localhost:8081/uploads/products/${p.image}` : null;
        setProduct(p);
      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  }, []);

  const toggleWishlist = () => {
    const updated = wishlist.some(i => i.id === product.id)
      ? wishlist.filter(i => i.id !== product.id)
      : [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (!product) return <div className="loading-screen">Đang tải sản phẩm...</div>;

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + " ₫";

  return (
    <div className="detail-page-wrapper">
      <UserHeader />

      <main className="detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/user/home">Trang chủ</Link> <span>/</span>
          <Link to="/user/products">Điện thoại</Link> <span>/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-main-info">
          {/* Cột trái: Hình ảnh */}
          <div className="detail-image-section">
            <div className="image-card">
              {product.mainImage ? (
                <img src={product.mainImage} alt={product.name} className="main-img" />
              ) : (
                <div className="placeholder">No Image</div>
              )}
            </div>
          </div>

          {/* Cột phải: Thông tin & Mua hàng */}
          <div className="detail-content-section">
            <div className="header-meta">
              <span className="brand-label">{product.category?.name}</span>
              <button 
                onClick={toggleWishlist} 
                className={`wishlist-toggle ${wishlist.some(i => i.id === product.id) ? "active" : ""}`}
              >
                <Heart size={24} fill={wishlist.some(i => i.id === product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <h1 className="product-title">{product.name}</h1>
            
            <div className="price-tag">
              <span className="current-price">{formatPrice(product.price)}</span>
              <span className="status-tag">{product.stock > 0 ? "Còn hàng" : "Hết hàng"}</span>
            </div>

            <div className="policy-highlights">
              <div className="policy-item">
                <Truck size={18} /> <span>Giao hàng miễn phí toàn quốc</span>
              </div>
              <div className="policy-item">
                <ShieldCheck size={18} /> <span>Bảo hành chính hãng 12 tháng</span>
              </div>
              <div className="policy-item">
                <RefreshCw size={18} /> <span>Lỗi là đổi mới trong 30 ngày</span>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-add-cart" 
                onClick={() => { addToCart(product, 1); alert("Đã thêm vào giỏ hàng!") }}
                disabled={product.stock <= 0}
              >
                <ShoppingCart size={20} /> THÊM VÀO GIỎ HÀNG
              </button>
              {/* <button className="btn-buy-now" disabled={product.stock <= 0}>
                MUA NGAY
              </button> */}
            </div>

            <button className="back-link" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Quay lại trang trước
            </button>
          </div>
        </div>

        {/* Phần mô tả chi tiết phía dưới */}
        <section className="product-description-section">
          <h2 className="section-title">Mô tả sản phẩm</h2>
          <div className="description-content" dangerouslySetInnerHTML={{ __html: product.description }} />
        </section>
      </main>

      <UserFooter />
    </div>
  );
}