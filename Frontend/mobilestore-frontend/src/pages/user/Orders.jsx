import { useEffect, useState } from 'react';
import NavbarUser from '../../components/NavbarUser';
import axios from '../../api/axios';

function Orders() {
  const [orders,setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    axios.get(`/orders/user/${user.id}`)
      .then(res=>setOrders(res.data))
      .catch(err=>console.error(err));
  }, []);

  return (
    <div style={{ padding:'20px' }}>
      <NavbarUser />
      <h2>Your Orders</h2>
      {orders.map(o=>(
        <div key={o.id}>Order #{o.id} - {o.approved ? 'Approved':'Pending'}</div>
      ))}
    </div>
  );
}

export default Orders;
