import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css/page/ProductPage.css";
import ProfileHeader from "../components/page/PageHeader";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [compareList, setCompareList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  // Chỉ lấy từ Context, không dùng useState cho user nữa
  const { user, token, fetchCart } = useContext(DataContext);
  const navigate = useNavigate();

  /* ================= LOAD BRANDS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/brands")
      .then((res) => setBrands(res.data || []))
      .catch(() => setBrands([]));
  }, []);

  /* ================= LOAD PRODUCTS ================= */
  const loadProducts = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        const list = (res.data?.data || []).filter((p) => p.status === "ACTIVE");
        setProducts(list);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= BRAND FILTER ================= */
  useEffect(() => {
    if (selectedBrand === "all") {
      loadProducts();
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        const list = (res.data?.data || []).filter(
          (p) => p.status === "ACTIVE" && p.brand?.id === Number(selectedBrand)
        );
        setProducts(list);
      })
      .finally(() => setLoading(false));
  }, [selectedBrand]);

  /* ================= SEARCH (DEBOUNCE) ================= */
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!keyword.trim()) {
        loadProducts();
        return;
      }
      handleSearch();
    }, 300);
    return () => clearTimeout(delay);
  }, [keyword]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      setSelectedBrand("all");
      const res = await axios.get("http://localhost:8080/api/products/search-by-name", {
        params: { keyword }
      });
      setProducts(res.data?.data || []);
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= COMPARE ================= */
  useEffect(() => {
    setCompareList(JSON.parse(localStorage.getItem("compare")) || []);
  }, []);

  const addToCompare = (id) => {
    let list = [...compareList];
    if (list.includes(id)) return;
    if (list.length === 2) list.shift();
    list.push(id);
    localStorage.setItem("compare", JSON.stringify(list));
    setCompareList(list);
  };

  const removeFromCompare = (id) => {
    const list = compareList.filter((x) => x !== id);
    localStorage.setItem("compare", JSON.stringify(list));
    setCompareList(list);
  };

  /* ================= ADD TO CART ================= */
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
    <div className="hp-container">
      <ProfileHeader />

      <section className="hp-section">
        <div className="hp-layout">
          <aside className="hp-sidebar">
            <div className="hp-box">
              <h4 className="hp-box-title">Thương hiệu</h4>
              <ul className="brand-list">
                <li className={selectedBrand === "all" ? "active" : ""} onClick={() => setSelectedBrand("all")}>Tất cả</li>
                {brands.map((b) => (
                  <li key={b.id} className={selectedBrand === String(b.id) ? "active" : ""} onClick={() => setSelectedBrand(String(b.id))}>
                    {b.name}
                  </li>
                ))}
              </ul>
            </div>

            {compareList.length > 0 && (
              <div className="hp-box">
                <h4 className="hp-box-title">So sánh</h4>
                <div className="compare-items">
                  {compareList.map((id) => {
                    const p = products.find((x) => x.id === id);
                    if (!p) return null;
                    return (
                      <div key={id} className="compare-item">
                        <img src={p.imageUrls?.[0]} alt={p.name} />
                        <span>{p.name}</span>
                        <button onClick={() => removeFromCompare(id)}>×</button>
                      </div>
                    );
                  })}
                </div>
                {compareList.length === 2 && (
                  <button className="compare-btn" onClick={() => navigate(`/compare?p1=${compareList[0]}&p2=${compareList[1]}`)}>
                    So sánh ngay →
                  </button>
                )}
              </div>
            )}
          </aside>

          <div className="hp-content">
            <div className="hp-search">
              <span>🔍</span>
              <input placeholder="Tìm kiếm sản phẩm..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>

            {loading && <p>Đang tải...</p>}
            <div className="hp-grid">
              {products.map((p) => (
                <div key={p.id} className="hp-card">
                  <div className="hp-img-wrap">
                    {p.quantityInStock === 0 && <div className="hp-out-stock">HẾT HÀNG</div>}
                    <img src={p.imageUrls?.[0]} alt={p.name} onClick={() => navigate(`/product/${p.id}`)} />
                  </div>
                  <div className="hp-info">
                    <span className="hp-brand">{p.brand?.name}</span>
                    <h3 onClick={() => navigate(`/product/${p.id}`)}>{p.name}</h3>
                    <div className="hp-rating">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className={i <= Math.round(p.avgRating || 0) ? "star active" : "star"}>★</span>
                      ))}
                    </div>
                    <p className="hp-price">{p.price.toLocaleString()} ₫</p>
                    <div className="hp-btn-row">
                      <button onClick={() => addToCompare(p.id)}>+ So sánh</button>
                      <button disabled={p.quantityInStock === 0} onClick={() => addToCart(p)}>🛒 Thêm</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}