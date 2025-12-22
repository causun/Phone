import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/page/ProductDetail.css";
import ProfileHeader from "../components/page/PageHeader";
import { DataContext } from "../DataContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token, setToken, fetchCart } = useContext(DataContext);

  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  // gallery
  const [activeImage, setActiveImage] = useState(0);

  // review filter
  const [starFilter, setStarFilter] = useState(0);
  const [hasCommentOnly, setHasCommentOnly] = useState(false);
  const [sortType, setSortType] = useState("newest");

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        const p = res?.data?.data ?? res?.data ?? null;

        if (!p || p.status !== "ACTIVE") {
          alert("Sản phẩm không còn kinh doanh!");
          navigate("/");
          return;
        }

        setProduct(p);
        setActiveImage(0);
      })
      .catch(() => navigate("/"));
  }, [id, navigate]);

  /* ================= LOAD REVIEWS ================= */
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/reviews/product/${id}`)
      .then((res) => {
        const payload = res?.data;
        let list = [];

        if (Array.isArray(payload)) list = payload;
        else if (Array.isArray(payload?.data)) list = payload.data;
        else if (Array.isArray(payload?.reviews)) list = payload.reviews;

        setReviews(list);
      })
      .catch(() => setReviews([]));
  }, [id]);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const localToken = localStorage.getItem("trip-token");
    if (!localToken) {
      setUser(null);
      return;
    }

    axios
      .get("http://localhost:8080/api/auth/user/me", {
        headers: { Authorization: `Bearer ${localToken}` },
      })
      .then((res) => {
        setUser(res?.data?.data ?? res?.data ?? null);
      })
      .catch(() => setUser(null));
  }, [token]);

  /* ================= CART ================= */
  const addToCart = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm vào giỏ!");
      navigate("/login");
      return;
    }

    if (product.quantityInStock === 0) {
      alert("Sản phẩm đã hết hàng!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/cart/add?productId=${id}&quantity=1`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (typeof fetchCart === 'function') {
        fetchCart();
      }
      
      alert("Đã thêm vào giỏ hàng 🛒");
    } catch (err) {
      console.error(err);
      alert("Không thể thêm vào giỏ hàng!");
    }
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  /* ================= RATING STATS ================= */
  const ratingStats = useMemo(() => {
    const total = reviews.length;
    if (total === 0)
      return { avg: 0, total: 0, bars: [0, 0, 0, 0, 0] };

    const bars = [0, 0, 0, 0, 0];
    let sum = 0;

    reviews.forEach((r) => {
      const rt = Number(r.rating) || 0;
      sum += rt;
      if (rt >= 1 && rt <= 5) bars[rt - 1]++;
    });

    return { avg: sum / total, total, bars };
  }, [reviews]);

  /* ================= FILTER REVIEWS ================= */
  const filteredReviews = useMemo(() => {
    let list = [...reviews];

    if (starFilter > 0)
      list = list.filter((r) => Number(r.rating) === starFilter);

    if (hasCommentOnly)
      list = list.filter((r) => r.comment?.trim());

    list.sort((a, b) => {
      const aD = new Date(a.createdAt || 0);
      const bD = new Date(b.createdAt || 0);
      switch (sortType) {
        case "oldest":
          return aD - bD;
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return bD - aD;
      }
    });

    return list;
  }, [reviews, starFilter, hasCommentOnly, sortType]);

  const renderStars = (rating) =>
    "⭐".repeat(Math.round(rating || 0)) +
    "☆".repeat(5 - Math.round(rating || 0));

  /* ================= AVATAR RENDERER (Dựa trên NewsDetailPage) ================= */
  const renderAvatar = (name, url, size = 44) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "U";
    return (
      <div className="avatar-circle" style={{ 
        width: size, 
        height: size, 
        backgroundColor: url ? 'transparent' : '#3182ce',
        flexShrink: 0,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold'
      }}>
        {url ? (
          <img 
            src={url} 
            alt={name} 
            style={{width: '100%', height: '100%', objectFit: 'cover'}} 
            onError={(e) => { 
              e.target.src = ""; 
              e.target.parentElement.style.backgroundColor = "#3182ce"; 
            }} 
          />
        ) : (
          <span>{firstLetter}</span>
        )}
      </div>
    );
  };

  if (!product)
    return (
      <div className="loading">
        <div className="spinner-border text-danger"></div>
      </div>
    );

  return (
    <div className="pd-container">
      <ProfileHeader
        user={user}
        onLogout={() => {
          localStorage.removeItem("trip-token");
          setToken(null);
          setUser(null);
          window.location.href = "/";
        }}
      />

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="pd-content">
        <div className="pd-left">
          <div className="pd-main-image">
            {product.quantityInStock === 0 && (
              <div className="pd-out-stock">HẾT HÀNG</div>
            )}
            <img
              src={product.imageUrls?.[activeImage]}
              alt={product.name}
            />
          </div>
          <div className="pd-thumb-list">
            {product.imageUrls?.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`thumb-${i}`}
                className={i === activeImage ? "active" : ""}
                onClick={() => setActiveImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="pd-right">
          <h2 className="pd-name">{product.name}</h2>
          <div className="pd-rating-line">
            <span className="pd-rating-score">{ratingStats.avg.toFixed(1)}</span>
            <span className="pd-rating-stars">{renderStars(ratingStats.avg)}</span>
            <span className="pd-rating-count">({ratingStats.total} đánh giá)</span>
          </div>
          <span className="pd-price">{product.price.toLocaleString()} ₫</span>
          <div className="pd-actions">
            <button className="pd-buy" onClick={buyNow} disabled={product.quantityInStock === 0}>Mua ngay</button>
            <button className="pd-add" onClick={addToCart} disabled={product.quantityInStock === 0}>Thêm vào giỏ</button>
          </div>
          <ul className="pd-spec">
            <li>🧠 Chip: {product.chipset}</li>
            <li>🔋 Pin: {product.battery}</li>
            <li>💾 RAM: {product.ram}</li>
            <li>📦 Bộ nhớ: {product.storage}</li>
            <li>🎨 Màu: {product.color}</li>
            <li>🤖 Hệ điều hành: {product.os}</li>
            <li>📱 Màn hình: {product.screenSize}</li>
            <li>📷 Camera: {product.camera}</li>
          </ul>
        </div>
      </div>

      <div className="pd-desc">
        <h3>Mô tả sản phẩm</h3>
        <p>{product.description}</p>
      </div>

      {/* ================= REVIEW SECTION ================= */}
      <div className="pd-review-section">
        <h3>Đánh giá sản phẩm</h3>

        {/* Rating Summary Box */}
        <div className="pd-rating-box">
          <div className="pd-rating-left">
            <div className="pd-rating-number">{ratingStats.avg.toFixed(1)}</div>
            <div className="pd-stars-big">{renderStars(ratingStats.avg)}</div>
            <div className="pd-total">{ratingStats.total} đánh giá</div>
          </div>
          <div className="pd-rating-right">
            {[5,4,3,2,1].map((s) => (
              <div key={s} className="pd-bar">
                <span>{s} sao</span>
                <div className="pd-bg">
                  <div className="pd-fill" style={{ width: ratingStats.total ? `${(ratingStats.bars[s-1]/ratingStats.total)*100}%` : "0%" }}></div>
                </div>
                <span className="pd-bar-count">{ratingStats.bars[s-1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pd-filter-row">
          <div className="pd-filter-stars">
            <button className={"pd-filter-btn " + (starFilter === 0 ? "active" : "")} onClick={() => setStarFilter(0)}>Tất cả</button>
            {[5,4,3,2,1].map((s) => (
              <button key={s} className={"pd-filter-btn " + (starFilter === s ? "active" : "")} onClick={() => setStarFilter(s)}>{s} sao</button>
            ))}
            <button className={"pd-filter-btn " + (hasCommentOnly ? "active" : "")} onClick={() => setHasCommentOnly((v) => !v)}>Có bình luận</button>
          </div>
          <div className="pd-sort">
            <span>Sắp xếp:</span>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="highest">Sao cao</option>
              <option value="lowest">Sao thấp</option>
            </select>
          </div>
        </div>

        {/* Review List - FIXED HERE */}
        <div className="pd-review-list">
          {filteredReviews.length === 0 && (
            <p className="pd-no-review">Chưa có đánh giá phù hợp với bộ lọc.</p>
          )}

          {filteredReviews.map((r) => (
            <div key={r.id} className="pd-review" style={{ borderBottom: '1px solid #eee', padding: '20px 0' }}>
              <div className="pd-review-header" style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
      
                {/* SỬA TẠI ĐÂY: Truyền r.userAvatar thay vì r.user?.avatar */}
                {renderAvatar(r.userName, r.userAvatar, 48)}
                
                <div>
                  <div className="pd-review-name" style={{ fontWeight: 'bold' }}>
                    {r.userName || "Người dùng"}
                  </div>
                  <div className="pd-review-stars">
                    {"⭐".repeat(r.rating || 0)}
                  </div>
                  <div className="pd-review-date" style={{ fontSize: '12px', color: '#888' }}>
                  {(() => {
                    if (!r.createdAt) return "Vừa xong";
                    
                    // Xử lý trường hợp Backend trả về mảng số [2023, 12, 22...] thường gặp ở Java Instant
                    let dateObj;
                    if (Array.isArray(r.createdAt)) {
                      dateObj = new Date(r.createdAt[0], r.createdAt[1] - 1, r.createdAt[2]);
                    } else {
                      dateObj = new Date(r.createdAt);
                    }

                    // Nếu dateObj hợp lệ thì hiển thị, không thì hiện mặc định
                    return isNaN(dateObj.getTime()) 
                      ? "Ngày không xác định" 
                      : dateObj.toLocaleDateString("vi-VN");
                  })()}
                </div>
                </div>
              </div>

              {r.comment && <p className="pd-review-comment">{r.comment}</p>}

              {r.adminReply && (
                <div className="pd-admin-reply">
                  <span className="pd-admin-label">Phản hồi của shop:</span>
                  <p>{r.adminReply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}