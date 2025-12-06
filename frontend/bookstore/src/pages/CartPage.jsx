import React, { useState } from 'react';
import API from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function CartPage(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [flatno, setFlatno] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const remove = (index) => {
    const c = [...cart];
    c.splice(index,1);
    setCart(c);
    localStorage.setItem('cart', JSON.stringify(c));
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    const total = cart.reduce((s, c) => s + Number(c.price || 0), 0).toString();
    try {
      const res = await API.post('/orders', { books: cart, totalAmount: total, flatno, pincode, city, state });
      localStorage.removeItem('cart');
      alert('Order placed');
      navigate('/myorders');
    } catch (err) {
      alert(err.response?.data?.msg || 'Order failed');
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Cart</h3>
      {cart.length === 0 ? <div>Cart is empty</div> : (
        <>
          {cart.map((c, i) => (
            <div key={i} style={{ borderBottom: '1px solid #ddd', padding:8 }}>
              <div>{c.title} - ₹{c.price}</div>
              <button onClick={()=>remove(i)}>Remove</button>
            </div>
          ))}
          <div style={{ marginTop: 10 }}>
            <input placeholder="Flat no" value={flatno} onChange={e=>setFlatno(e.target.value)} />
            <input placeholder="Pincode" value={pincode} onChange={e=>setPincode(e.target.value)} />
            <input placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
            <input placeholder="State" value={state} onChange={e=>setState(e.target.value)} />
            <button onClick={placeOrder}>Place order</button>
          </div>
        </>
      )}
    </div>
  );
}
