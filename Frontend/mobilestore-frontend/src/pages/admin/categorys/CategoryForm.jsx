import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../api/axios';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import './category.css';

function CategoryForm() {
  const { id } = useParams(); // nếu edit
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    if(id){
      // edit: load dữ liệu
      axios.get(`/categories/${id}`)
        .then(res=>{
          setName(res.data.name);
          setDescription(res.data.description);
        })
        .catch(err=>console.error(err));
    }
  }, [id]);

  const handleSubmit = () => {
    const payload = { name, description, active:true };
    if(id){
      axios.put(`/categories/${id}`, payload)
        .then(()=> navigate('/admin/categories'))
        .catch(err=>console.error(err));
    } else {
      axios.post(`/categories/save`, payload)
        .then(()=> navigate('/admin/categories'))
        .catch(err=>console.error(err));
    }
  };

  return (
    <div style={{ padding:'20px' }}>
      <h2>{id ? 'Edit Category' : 'Add Category'}</h2>
      <div style={{ margin:'10px 0' }}>
        <Input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <div style={{ margin:'10px 0' }}>
        <Input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      </div>
      <Button onClick={handleSubmit}>{id ? 'Save' : 'Add'}</Button>
    </div>
  );
}

export default CategoryForm;
