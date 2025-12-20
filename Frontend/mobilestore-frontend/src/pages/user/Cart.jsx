import React, { useContext } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import "./styles/cart.css";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import UserFooter from "../../components/UserFooter";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const shipping = subtotal > 100000 ? 0 : 30000; // tùy chỉnh: >100k free, else 30k
 
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      // nếu chưa login, chuyến tới trang login (ProtectedRoute cũng có kiểm tra)
      navigate("/login");
      return;
    }
    navigate("/user/checkout");
  };

  return (
    <>
      <UserHeader />
      <div className="cart-page container">
        <h1 className="cart-title">Giỏ hàng của bạn</h1>
        <p className="cart-count">{cart.length} sản phẩm</p>

        <div className="cart-grid">
          <div className="cart-items">
            {cart.length === 0 && <div className="empty">Giỏ hàng trống. Hãy thêm sản phẩm vào giỏ.</div>}
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <div className="cart-card-content">
                  <img
                    src={item.image ? (item.image.startsWith("http") ? item.image : `http://localhost:8081/uploads/products/${item.image}`) : "/placeholder.png"}
                    alt={item.name}
                    className="cart-img"
                  />

                  <div className="cart-info">
                    <h3 className="cart-name">{item.name}</h3>
                    <p className="cart-price-single">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
                        .format(item.price || 0)}
                    </p>
                    <p className="cart-price">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format((item.price || 0) * (item.quantity || 1))}</p>

                    <div className="quantity-box">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}>
                        <Minus size={18} />
                      </button>

                      <span className="qty-number">{item.quantity || 1}</span>

                      <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2>Tổng đơn hàng</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span>{shipping === 0 ? "Miễn phí" : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(shipping)}</span>
            </div>
            
            <div className="summary-total">
              <span>Tổng</span>
              <span className="total-text">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout} disabled={cart.length === 0}>
              Thanh toán (COD)
            </button>

            <button className="continue-btn" onClick={() => navigate("/user/products")}>
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
}
