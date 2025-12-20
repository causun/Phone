"use client"

import { useEffect, useState } from "react"
import axios from "../../api/axios"
import UserHeader from "../../components/UserHeader"
import UserFooter from "../../components/UserFooter"
import "./styles/order.css"
import { Package, Truck, CheckCircle, XCircle, ChevronDown, ChevronUp, MapPin, ReceiptText } from "lucide-react"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [expandedOrder, setExpandedOrder] = useState(null)
  const user = JSON.parse(localStorage.getItem("user") || "null")

  useEffect(() => {
    if (!user) return;
    axios.get(`/orders/user/${user.id}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        const mapped = data.map(o => ({
          ...o,
          orderNumber: o.orderCode || `#ORD-${o.id.toString().padStart(4, "0")}`, 
          totalAmount: o.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0,
        }));
        setOrders(mapped.reverse()); // Đơn mới nhất lên đầu
      })
      .catch(err => console.error(err));
  }, [user]);

  const formatDate = (date) => new Date(date).toLocaleString("vi-VN", { 
    year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: '2-digit' 
  })
  
  const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { 
    style: "currency", currency: "VND" 
  }).format(price)

  const renderStatus = (status) => {
    const s = String(status);
    if (s === "0" || s === "PENDING") return <span className="status-tag pending"><Package size={16}/> Chờ xử lý</span>;
    if (s === "1" || s === "APPROVED") return <span className="status-tag approved"><CheckCircle size={16}/> Đã xác nhận</span>;
    return <span className="status-tag cancelled"><XCircle size={16}/> Đã hủy</span>;
  }

  return (
    <>
      <UserHeader />
      <div className="orders-container">
        <div className="orders-wrapper">
          <header className="page-header">
            <h1>Đơn hàng của tôi</h1>
            <p>Quản lý và theo dõi hành trình đơn hàng của bạn</p>
          </header>

          {orders.length === 0 ? (
            <div className="empty-state">
              <Package size={64} />
              <p>Bạn chưa có đơn hàng nào.</p>
              <button onClick={() => window.location.href = '/'}>Mua sắm ngay</button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className={`order-group ${expandedOrder === order.id ? 'active' : ''}`}>
                  <div className="order-main-card" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                    <div className="card-left">
                      <span className="order-code">{order.orderCode}</span> 
                      <span className="order-time">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="card-right">
                      <div className="order-price-summary">
                        <span className="label">Tổng tiền:</span>
                        <span className="value">{formatPrice(order.totalAmount)}</span>
                      </div>
                      {renderStatus(order.status)}
                      {expandedOrder === order.id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="order-expanded-details">
                      <div className="details-grid">
                        {/* Cột 1: Thông tin vận chuyển */}
                        <div className="details-section">
                          <h4><MapPin size={18}/> Thông tin nhận hàng</h4>
                          <div className="info-box">
                            <p><strong>{order.fullName}</strong></p>
                            <p>{order.phone}</p>
                            <p className="address">{order.address}</p>
                            {order.notes && <p className="note"><span>Ghi chú:</span> {order.notes}</p>}
                          </div>
                        </div>

                        {/* Cột 2: Sản phẩm */}
                        <div className="details-section">
                          <h4><ReceiptText size={18}/> Danh sách sản phẩm</h4>
                          <div className="items-list">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="item-row">
                                <img src={`http://localhost:8081/uploads/products/${item.image}`} alt={item.productName} />
                                <div className="item-info">
                                  <p className="name">{item.productName}</p>
                                  <p className="qty-price">x{item.quantity} <span>{formatPrice(item.price)}</span></p>
                                </div>
                                <div className="item-total">
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="payment-final">
                            <div className="final-row">
                              <span>Tiền hàng:</span>
                              <span>{formatPrice(order.totalAmount)}</span>
                            </div>
                            <div className="final-row">
                              <span>Phí vận chuyển:</span>
                              <span>0 đ</span>
                            </div>
                            <div className="final-row total">
                              <span>Tổng thanh toán:</span>
                              <span className="big-price">{formatPrice(order.totalAmount)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <UserFooter />
    </>
  )
}