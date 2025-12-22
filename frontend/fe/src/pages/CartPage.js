import React, { useContext, useEffect } from "react"; // Đã thêm useEffect
import { useNavigate, Link } from "react-router-dom"; // Đã thêm Link
import axios from "axios";
import { DataContext } from "../DataContext";
import PageHeader from "../components/page/PageHeader";
import "../css/page/CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();
  const { user, token, cart, fetchCart } = useContext(DataContext);

  // Ép tải lại dữ liệu mới nhất từ Server khi vào trang này
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  const updateQty = async (cartItemId, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put(`http://localhost:8080/api/cart/update/${cartItemId}?quantity=${newQty}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart(); 
    } catch (err) { 
      alert("Lỗi cập nhật số lượng!"); 
    }
  };

  const removeItem = async (cartItemId) => {
    if (!window.confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) { 
      alert("Lỗi xóa sản phẩm!"); 
    }
  };

  const total = Array.isArray(cart) 
    ? cart.reduce((sum, i) => sum + ((i.product?.price || 0) * i.quantity), 0) 
    : 0;

  return (
    <div className="cart-container">
      <PageHeader />
      <div className="cart-content" style={{ marginTop: '100px', padding: '0 20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Giỏ hàng của bạn</h2>
        
        {(!cart || cart.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Giỏ hàng đang trống.</p>
            <Link to="/products" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
              Quay lại mua sắm ngay!
            </Link>
          </div>
        ) : (
          <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', borderBottom: '1px solid #eee' }}>
                  <img 
  src={
    // Ưu tiên 1: Lấy từ mảng imageUrls giống trang Home
    item.product?.imageUrls?.[0] 
      ? item.product.imageUrls[0]
      // Ưu tiên 2: Nếu Backend trả về đường dẫn tương đối (bắt đầu bằng /)
      : (item.product?.imageUrl 
          ? (item.product.imageUrl.startsWith('http') 
              ? item.product.imageUrl 
              : `http://localhost:8080${item.product.imageUrl}`)
          : 'https://via.placeholder.com/100')
  } 
  alt={item.product?.name || "Product"} 
  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
  onError={(e) => { 
    e.target.onerror = null; 
    e.target.src = 'https://via.placeholder.com/100'; 
  }}
/>
                  
                  <div className="info" style={{ flex: 1 }}>
                    <div className="name" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.product?.name}</div>
                    <div className="price" style={{ color: 'var(--text-muted)' }}>{item.product?.price?.toLocaleString()} ₫</div>
                    <div className="qty-box" style={{ marginTop: '10px' }}>
                      <button onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                      <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove" onClick={() => removeItem(item.id)} style={{ marginTop: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                      🗑 Xóa
                    </button>
                  </div>
                  <div className="subtotal" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {((item.product?.price || 0) * item.quantity).toLocaleString()} ₫
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary" style={{ background: '#f8fafc', padding: '25px', borderRadius: '15px', height: 'fit-content' }}>
              <h3 style={{ marginBottom: '20px' }}>Tổng đơn hàng</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span>Thành tiền:</span>
                <strong style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{total.toLocaleString()} ₫</strong>
              </div>
              <button 
                className="btn-checkout" 
                onClick={() => navigate("/checkout")}
                style={{ width: '100%', padding: '15px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                TIẾN HÀNH ĐẶT HÀNG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}