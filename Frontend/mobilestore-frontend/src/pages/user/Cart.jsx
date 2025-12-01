import NavbarUser from '../../components/NavbarUser';
import Button from '../../components/Button';
import { useState } from 'react';

function Cart() {
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart'))||[]);

  const handleRemove = (id)=>{
    const newCart = cart.filter(p=>p.id!==id);
    setCart(newCart);
    localStorage.setItem('cart',JSON.stringify(newCart));
  }

  return (
    <div style={{ padding:'20px' }}>
      <NavbarUser />
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> :
        cart.map(p=>(
          <div key={p.id}>{p.name} - ${p.price} <Button onClick={()=>handleRemove(p.id)}>Remove</Button></div>
        ))
      }
    </div>
  );
}

export default Cart;
