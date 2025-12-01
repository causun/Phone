import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import Button from '../../../components/Button';
import './category.css';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const loadCategories = () => {
    axios.get('/categories')
      .then(res=>setCategories(res.data))
      .catch(err=>console.error(err));
  };

  useEffect(()=>{ loadCategories(); }, []);

  const handleToggleStatus = (id) => {
    axios.patch(`/categories/toggle/${id}`)
      .then(()=> loadCategories())
      .catch(err=>console.error(err));
  };

  return (
    <div>
      <div className="category-container">
        <div className="category-header">
          <h2>Category Management</h2>
          <div>
            <Button onClick={()=> navigate('/admin/categories/add')}>Add Category</Button>
            <input 
              type="text" 
              placeholder="Search..." 
              value={search} 
              onChange={e=>setSearch(e.target.value)}
              className="category-search"
            />
          </div>
        </div>
        <table className="category-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())).map(c=>(
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>{c.productCount}</td>
                <td>{c.active ? 'Open' : 'Closed'}</td>
                <td>
                  <Button onClick={()=> navigate(`/admin/categories/edit/${c.id}`)}>Edit</Button>
                  <Button onClick={()=> handleToggleStatus(c.id)}>{c.active ? 'Close' : 'Open'}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryManagement;
