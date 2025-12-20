import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, ChevronLeft } from 'lucide-react';
import axios from '../../../api/axios';
import './category.css';

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`/categories/${id}`)
        .then(res => setFormData({
            name: res.data.name,
            description: res.data.description,
            active: res.data.active
        }))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên danh mục');
      return;
    }

    setLoading(true);
    const apiCall = id 
      ? axios.put(`/categories/${id}`, formData) 
      : axios.post('/categories/save', formData);

    apiCall
      .then(() => navigate('/admin/categories'))
      .catch(err => {
        console.error(err);
        setError('Có lỗi xảy ra, vui lòng thử lại');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="cat-page">
      <div className="form-wrapper">
        <button className="btn-back" onClick={() => navigate('/admin/categories')}>
          <ChevronLeft size={20} /> Quay lại
        </button>

        <div className="cat-card form-card">
          <div className="form-header">
            <h2>{id ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</h2>
            <p>Điền thông tin chi tiết bên dưới</p>
          </div>

          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên danh mục <span className="required">*</span></label>
              <input 
                type="text" 
                className="form-control"
                value={formData.name}
                onChange={e => {
                   setFormData({...formData, name: e.target.value});
                   setError('');
                }}
                placeholder="Ví dụ: Điện thoại iPhone"
              />
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <textarea 
                rows="3"
                className="form-control"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Mô tả ngắn về danh mục này..."
              />
            </div>

            {/* <div className="form-group">
              <label>Trạng thái</label>
              <select 
                className="form-control"
                value={formData.active}
                onChange={e => setFormData({...formData, active: e.target.value === 'true'})}
              >
                <option value="true">Hiển thị (Hoạt động)</option>
                <option value="false">Ẩn (Tạm khóa)</option>
              </select>
            </div> */}

            <div className="form-actions">
               <button type="button" className="btn-outline" onClick={() => navigate('/admin/categories')}>
                 <X size={18} /> Hủy bỏ
               </button>
               <button type="submit" className="btn-solid" disabled={loading}>
                 <Save size={18} /> {loading ? 'Đang lưu...' : 'Lưu thông tin'}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoryForm;