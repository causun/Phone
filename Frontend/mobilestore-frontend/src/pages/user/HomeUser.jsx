"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingCart, User } from "lucide-react"
import axios from "../../api/axios"
import "./home.css"

function HomeUser() {
  const [products, setProducts] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])

  // 🔥 LẤY API THẬT TỪ BACKEND
  useEffect(() => {
    axios
      .get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Lỗi load sản phẩm:", err))
  }, [])

  // Load cart + wishlist từ localStorage
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"))
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"))
  }, [])

  const toggleWishlist = (product) => {
    const updated = wishlist.some(i => i.id === product.id)
      ? wishlist.filter(i => i.id !== product.id)
      : [...wishlist, product]

    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  const addToCart = (product) => {
    const updated = [...cart, product]
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    alert("Đã thêm vào giỏ hàng!")
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.mainImage} className="product-image" alt={product.name} />

        <button
          className={`btn-wishlist ${wishlist.some(w => w.id === product.id) ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category?.name}</p>

        <h3 className="product-name">{product.name}</h3>

        {/* ❗ LOẠI rating + reviews */}

        <div className="price">{formatPrice(product.price)}</div>

        <button className="btn-add" onClick={() => addToCart(product)}>
          <ShoppingCart size={16} /> Thêm vào giỏ
        </button>
      </div>
    </div>
  )

  return (
    <div className="home">

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">Mobile Store</h1>

          <nav className="nav">
            <a>Trang chủ</a>
            <a>Sản phẩm</a>
            <a>Blog</a>
            <a>Liên hệ</a>
          </nav>

          <div className="header-icons">
            <User size={22} />
            <div className="cart-icon">
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* BEST SELLERS (Bạn chưa có API loại bestSeller → hiển thị tất cả) */}
      <section className="section">
        <h2 className="section-title">Sản phẩm nổi bật</h2>
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          © 2025 Mobile Store. All rights reserved.
        </div>
      </footer>

    </div>
  )
}

export default HomeUser
