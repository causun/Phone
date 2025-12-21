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

  const [user, setUser] = useState(null);
  const { token } = useContext(DataContext);
  const navigate = useNavigate();

  /* ================= USER ================= */
  useEffect(() => {
    const t = localStorage.getItem("trip-token");
    if (!t || t === "undefined") {
      setUser(null);
      return;
    }

    axios
      .get("http://localhost:8080/api/auth/user/me", {
        headers: { Authorization: `Bearer ${t}` },
      })
      .then((res) => setUser(res.data.data))
      .catch(() => {
        localStorage.removeItem("trip-token");
        setUser(null);
      });
  }, [token]);

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
        const list = (res.data?.data || []).filter(
          (p) => p.status === "ACTIVE"
        );
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
          (p) =>
            p.status === "ACTIVE" &&
            p.brand?.id === Number(selectedBrand)
        );
        setProducts(list);
      })
      .finally(() => setLoading(false));
  }, [selectedBrand]);

  /* ================= SEARCH ================= */
  const handleSearch = async () => {
    setLoading(true);
    try {
      // 🔑 FIX: search theo name → reset brand
      setSelectedBrand("all");

      const res = await axios.get(
        "http://localhost:8080/api/products/search-by-name",
        { params: { keyword } }
      );

      setProducts(res.data?.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LIVE SEARCH (DEBOUNCE) ================= */
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!keyword.trim()) {
        loadProducts();
        return;
      }
      handleSearch();
    }, 300); // 300ms debounce

    return () => clearTimeout(delay);
  }, [keyword]);

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

  /* ================= CART ================= */
  const addToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const key = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];

    const found = cart.find((i) => i.id === product.id);
    if (found) found.quantity += 1;
    else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrls: product.imageUrls,
      });
    }

    localStorage.setItem(key, JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng 🛒");
  };

  return (
    <div className="hp-container">
      <ProfileHeader user={user} />

      <section className="hp-section">
        <div className="hp-layout">
          {/* ===== SIDEBAR LEFT ===== */}
          <aside className="hp-sidebar">
            <div className="hp-box">
              <h4 className="hp-box-title">Thương hiệu</h4>
              <ul className="brand-list">
                <li
                  className={selectedBrand === "all" ? "active" : ""}
                  onClick={() => setSelectedBrand("all")}
                >
                  Tất cả
                </li>
                {brands.map((b) => (
                  <li
                    key={b.id}
                    className={
                      selectedBrand === String(b.id) ? "active" : ""
                    }
                    onClick={() => setSelectedBrand(String(b.id))}
                  >
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
                  <button
                    className="compare-btn"
                    onClick={() =>
                      navigate(
                        `/compare?p1=${compareList[0]}&p2=${compareList[1]}`
                      )
                    }
                  >
                    So sánh ngay →
                  </button>
                )}
              </div>
            )}
          </aside>

          {/* ===== RIGHT CONTENT ===== */}
          <div className="hp-content">
            {/* SEARCH */}
            <div className="hp-search">
              <span style={{ fontSize: 18 }}>🔍</span>
              <input
                placeholder="Tìm kiếm sản phẩm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            {loading && <p>Đang tải...</p>}
            {!loading && products.length === 0 && (
              <p>Không tìm thấy sản phẩm</p>
            )}

            <div className="hp-grid">
              {products.map((p) => (
                <div key={p.id} className="hp-card">
                  <div className="hp-img-wrap">
                    {p.quantityInStock === 0 && (
                      <div className="hp-out-stock">HẾT HÀNG</div>
                    )}
                    <img
                      src={p.imageUrls?.[0]}
                      alt={p.name}
                      onClick={() => navigate(`/product/${p.id}`)}
                    />
                  </div>

                  <div className="hp-info">
                    <span className="hp-brand">{p.brand?.name}</span>

                    <h3 onClick={() => navigate(`/product/${p.id}`)}>
                      {p.name}
                    </h3>

                    <div className="hp-rating">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={
                            i <= Math.round(p.avgRating || 0)
                              ? "star active"
                              : "star"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="rating-text">
                        ({p.totalReviews || 0})
                      </span>
                    </div>

                    <p className="hp-price">
                      {p.price.toLocaleString()} ₫
                    </p>

                    <div className="hp-btn-row">
                      <button onClick={() => addToCompare(p.id)}>
                        + So sánh
                      </button>
                      <button
                        disabled={p.quantityInStock === 0}
                        onClick={() => addToCart(p)}
                      >
                        🛒 Thêm
                      </button>
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
