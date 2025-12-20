import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Plus, Search } from 'lucide-react'; // Dùng icon từ lucide-react giống Dashboard
import axios from '../../../api/axios';
import './category.css';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load danh mục
  const loadCategories = () => {
    setLoading(true);
    axios.get('/categories')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => { loadCategories(); }, []);

  // Lọc tìm kiếm
  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cat-page">
      {/* Header giống Dashboard */}
      <header className="cat-header">
        <div>
          <h1>Quản lý danh mục</h1>
          <p>Danh sách các dòng sản phẩm hiện có</p>
        </div>
        <button className="btn-solid" onClick={() => navigate('/admin/categories/add')}>
          <Plus size={18} style={{ marginRight: '5px' }} />
          Thêm danh mục
        </button>
      </header>

      {/* Thanh tìm kiếm & Card bao quanh bảng */}
      <div className="cat-card">
        <div className="cat-tools">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm danh mục..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="cat-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th style={{ width: '25%' }}>Tên danh mục</th>
                <th>Mô tả</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Sản phẩm</th>
                <th style={{ width: '60px', textAlign: 'center' }}></th> {/* Cột sửa */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="text-center">Đang tải dữ liệu...</td></tr>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((c, index) => (
                  <tr key={c.id} className={!c.active ? 'row-inactive' : ''}>
                    <td>{index + 1}</td>
                    
                    {/* Áp dụng class mới cho TÊN DANH MỤC */}
                    <td className="col-name">{c.name}</td>
                    
                    {/* Áp dụng class mới cho MÔ TẢ */}
                    <td className="col-description">{c.description || <span className="text-muted">---</span>}</td>
                    
                    <td style={{ textAlign: 'center' }}>{c.productCount}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-icon" 
                        onClick={() => navigate(`/admin/categories/edit/${c.id}`)}
                        title="Chỉnh sửa thông tin"
                      >
                        <Pencil size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center">Không tìm thấy dữ liệu.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryManagement;