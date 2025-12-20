import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import './orderDetail.css';
import { ChevronLeft, ChevronDown, CheckCircle, XCircle, Clock } from 'lucide-react';

// =================================================
// Component Mẫu In (Shopee Style - Khổ A5)
// =================================================
const PrintableInvoice = ({ order }) => {
  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  
  return (
    <div className="print-only invoice-container">
      {/* Header: Chỉ giữ mã đơn hàng và Barcode giả lập */}
      <div className="invoice-header-compact">
        <div className="barcode-placeholder">||||||||||||||||||||||||||||||||||||</div>
        <p className="order-code-text">MÃ ĐƠN HÀNG: <strong>{order.orderCode}</strong></p>
      </div>

      <div className="invoice-body">
        {/* Khung Từ/Đến chia 2 cột */}
        <div className="shipping-grid">
          <div className="shipping-box">
            <span className="print-label">TỪ (SENDER):</span>
            <p><strong>Mobile Store</strong></p>
            <p>0123.456.789</p>
          </div>
          <div className="shipping-box">
            <span className="print-label">ĐẾN (RECEIVER):</span>
            <p><strong>{order.fullName}</strong></p>
            <p>{order.phone}</p>
            <p className="print-address">{order.address}</p>
          </div>
        </div>

        {/* Bảng sản phẩm rút gọn */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>SL</th>
              <th>Tên sản phẩm</th>
              <th style={{ width: '30%' }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                <td>{item.productName}</td>
                <td style={{ textAlign: 'right' }}>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tổng tiền & Ghi chú */}
        <div className="invoice-summary-compact">
          <div className="print-note">
            <strong>Ghi chú:</strong> {order.notes || "Không có ghi chú"}
          </div>
          <div className="print-total">
            <p>Tổng thanh toán:</p>
            <div className="print-grand-total">{subtotal.toLocaleString('vi-VN')} đ</div>
          </div>
        </div>
      </div>

      <div className="invoice-footer-minimal">
        <p>Ngày in: {new Date().toLocaleString('vi-VN')} - Chữ ký người nhận: .......................................</p>
      </div>
    </div>
  );
};

// =================================================
// Các Card hiển thị trên giao diện Web
// =================================================
const ProductListCard = ({ items }) => (
  <div className="card product-list-card">
    <h3>Thông tin đơn hàng</h3>
    {items.map((item) => (
      <div key={item.id} className="product-item">
        <div className="product-main-info">
          <img src={`http://localhost:8081/uploads/products/${item.image}`} alt={item.productName} className="product-image" />
          <div className="product-details">
            <p className="product-name">{item.productName}</p>
            <p className="product-price-single">{item.price.toLocaleString('vi-VN')} đ</p>
          </div>
        </div>
        <div className="product-quantity-right">x{item.quantity}</div>
      </div>
    ))}
  </div>
);

const ShippingAddressCard = ({ address }) => (
  <div className="card shipping-address-card">
    <h3>Thông tin giao hàng</h3>
    <p><span className="info-label">Người nhận:</span> <span className="info-value">{address.recipient}</span></p>
    <p><span className="info-label">SĐT:</span> <span className="info-value">{address.phone}</span></p>
    <p><span className="info-label">Địa chỉ:</span> <span className="info-value">{address.address}</span></p>
  </div>
);

const CustomerInfoCard = ({ order }) => (
  <div className="card customer-info-card">
    <h3>Thông tin tài khoản</h3>
    <p><span className="info-label">Mã khách hàng:</span> <span className="info-value">ID: {order.userId}</span></p>
    <p><span className="info-label">Tên tài khoản:</span> <span className="info-value">{order.accountName || "N/A"}</span></p>
    <p><span className="info-label">Email:</span> <span className="info-value">{order.accountEmail || "N/A"}</span></p>
    <p><span className="info-label">SĐT tài khoản:</span> <span className="info-value">{order.accountPhone || "N/A"}</span></p>
  </div>
);

const PaymentDetailCard = ({ items }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  return (
    <div className="card payment-detail-card">
      <h3>Chi tiết thanh toán</h3>
      <p className="row-total"><span>Tổng tiền hàng:</span> <span>{subtotal.toLocaleString('vi-VN')} đ</span></p>
      <p className="row-total"><span>Phí vận chuyển:</span> <span>0 đ</span></p>
      <hr />
      <p className="total-label-row">
        <span>Tổng cộng:</span> 
        <span className="total-amount-large">{total.toLocaleString('vi-VN')} đ</span>
      </p>
    </div>
  );
};

// =================================================
// TRANG CHÍNH
// =================================================
export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = () => {
    axios.get(`/orders/admin/${id}`)
      .then(res => setOrder(res.data))
      .catch(console.error);
  };

  const handleUpdateStatus = async (newStatus) => {
    const statusText = newStatus === 'APPROVED' ? 'Xác nhận' : 'Hủy';
    if (!window.confirm(`Bạn có chắc muốn ${statusText} đơn hàng này?`)) return;

    setIsUpdating(true);
    try {
      await axios.put(`/orders/admin/update/${id}/${newStatus}`);
      await fetchOrderDetail();
      setShowOptions(false);
      alert('Cập nhật trạng thái thành công');
    } catch (err) {
      alert('Cập nhật thất bại');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!order) return <div className="loading">Đang tải dữ liệu...</div>;

  const renderStatusBadge = (status) => {
    const s = String(status);
    if (s === "PENDING" || s === "0") return <span className="badge status-0"><Clock size={16}/> Chờ xử lý</span>;
    if (s === "APPROVED" || s === "1") return <span className="badge status-1"><CheckCircle size={16}/> Đã xác nhận</span>;
    if (s === "REJECTED" || s === "2") return <span className="badge status-2"><XCircle size={16}/> Đã hủy</span>;
    return <span className="badge">{status}</span>;
  };

  return (
    <div className="order-detail-page">
      {/* 1. GIAO DIỆN HIỂN THỊ WEB */}
      <div className="web-ui-container">
        <header className="order-header">
          <div className="order-title">
            <ChevronLeft className="back-icon" size={32} onClick={() => navigate(-1)} />
            <div className="order-info">
              <h1>{order.orderCode}</h1>
              <p className="order-date">Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
            </div>
          </div>
          <button className="print-button" onClick={() => window.print()}>🖨️ In đơn hàng</button>
        </header>

        <div className="order-status-section">
  {/* Hiển thị dòng trạng thái */}
  <div className="status-container">
    <span className="status-label">Trạng thái hiện tại:</span>
    <div className="status-badge-wrapper">
      {renderStatusBadge(order.status)}
    </div>
  </div>

  {/* Phần nút bấm cập nhật (chỉ hiện khi đơn là PENDING/0) */}
  {(String(order.status) === "0" || order.status === "PENDING") && (
    <div className="update-dropdown-container">
      <button className="update-status-toggle" onClick={() => setShowOptions(!showOptions)}>
        Cập nhật trạng thái <ChevronDown size={18} />
      </button>
      {showOptions && (
        <div className="status-options-menu">
          <button className="opt-btn approve" onClick={() => handleUpdateStatus('APPROVED')}>
            <CheckCircle size={18} /> Xác nhận
          </button>
          <button className="opt-btn reject" onClick={() => handleUpdateStatus('REJECTED')}>
            <XCircle size={18} /> Hủy đơn
          </button>
        </div>
      )}
    </div>
  )}
</div>

        <div className="order-content-layout">
          {/* CỘT TRÁI: Đơn hàng và Thanh toán */}
          <div className="left-column">
            <ProductListCard items={order.items || []} />
            <PaymentDetailCard items={order.items || []} />
            {order.notes && (
              <div className="card note-card">
                <strong>Ghi chú:</strong> {order.notes}
              </div>
            )}
          </div>

          {/* CỘT PHẢI: Giao hàng và Khách hàng */}
          <div className="right-column">
            <ShippingAddressCard address={{ recipient: order.fullName, phone: order.phone, address: order.address }} />
            <CustomerInfoCard order={order} />
          </div>
        </div>
      </div>

      {/* 2. GIAO DIỆN KHI IN (Bị ẩn trên web) */}
      <PrintableInvoice order={order} />
    </div>
  );
}