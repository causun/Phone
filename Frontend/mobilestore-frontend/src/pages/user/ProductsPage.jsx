"use client"

import { useState, useEffect, useContext, useCallback } from "react"
import { ShoppingCart, Filter, Search, X } from "lucide-react" // Thêm Search và X
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import UserHeader from "../../components/UserHeader"
import UserFooter from "../../components/UserFooter"
import { CartContext } from "../../context/CartContext"
import "./styles/productPage.css"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [priceRange, setPriceRange] = useState(null)
  const [searchTerm, setSearchTerm] = useState("") // State cho tìm kiếm
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  const fetchProducts = useCallback(() => {
    let url = `/products?`
    if (selectedCategory) url += `categoryId=${selectedCategory}&` // backend nhận categoryId
    if (searchTerm) url += `name=${searchTerm}&` // backend query :name

    axios.get(url)
      .then(res => {
        let prods = (res.data.content || []).map(p => ({
          ...p,
          mainImage: p.image ? `http://localhost:8081/uploads/products/${p.image}` : null
        }));
        const newestProducts = prods.sort((a,b) => b.id - a.id).slice(0,15);
        setProducts(newestProducts);
      })
      .catch(err => console.error("Lỗi:", err))
  }, [selectedCategory, priceRange, searchTerm]) // Chạy lại khi searchTerm thay đổi

  useEffect(() => {
    axios.get("/categories").then(res => setCategories(res.data))
    
    // Kỹ thuật Debounce: Chờ người dùng ngừng gõ 500ms mới gọi API
    const delayDebounceFn = setTimeout(() => {
      fetchProducts()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchProducts])

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + " ₫"

  return (
    <div className="bg-light">
      <UserHeader />
      
      <main className="container-custom">
        <div className="page-layout">
          {/* --- Sidebar --- */}
          <aside className="sidebar-modern">
            <div className="filter-group">
              <h4 className="filter-title"><Filter size={18} /> Danh mục</h4>
              <ul className="filter-options">
                <li className={!selectedCategory ? "active" : ""} onClick={() => setSelectedCategory(null)}>Tất cả</li>
                {categories.map(cat => (
                  <li key={cat.id} className={selectedCategory === cat.id ? "active" : ""} onClick={() => setSelectedCategory(cat.id)}>
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
            {/* ... Phần khoảng giá giữ nguyên ... */}
          </aside>

          {/* --- Main Content --- */}
          <section className="products-content">
            {/* Header Area */}
            <div className="content-header-area">
              <h2 className="category-name">
                {searchTerm ? `Kết quả cho "${searchTerm}"` : (selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Sản phẩm mới nhất")}
              </h2>

              {/* THANH TÌM KIẾM MỚI */}
              
              <div className="search-wrapper">
                {/* <Search className="search-icon" size={20} /> */}
                <input 
                  type="text" 
                  placeholder="Bạn tìm điện thoại gì..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <X className="clear-search" size={18} onClick={() => setSearchTerm("")} />
                )}
                
              </div>
            </div>

            <div className="products-grid-modern">
  {products.length > 0 ? (
    products.map(product => (
      <div key={product.id} className="product-card-modern" onClick={() => navigate(`/user/product/${product.id}`)}>
        <div className="badge-new">Mới nhất</div>
        <div className="image-box">
          <img src={product.mainImage} alt={product.name} />
        </div>
        <div className="product-details">
          <span className="brand-tag">{product.category?.name}</span>
          <h3 className="name-text">{product.name}</h3>
          <div className="price-row">
            <span className="main-price">{formatPrice(product.price)}</span>
          </div>
          
          {/* CẬP NHẬT NÚT NÀY */}
          <button className="add-to-cart-btn" onClick={(e) => {
            e.stopPropagation(); // Ngăn không cho nhảy vào trang chi tiết
            addToCart(product, 1);
            alert("Đã thêm vào giỏ hàng!"); // Thêm dòng thông báo này
          }}>
            <ShoppingCart size={18} />
            <span>Thêm vào giỏ</span>
          </button>
          
        </div>
      </div>
    ))
  ) : (
    <div className="no-results">
      <p>Không tìm thấy điện thoại nào khớp với từ khóa của bạn.</p>
    </div>
  )}
</div>
          </section>
        </div>
      </main>
      <UserFooter />
    </div>
  )
}