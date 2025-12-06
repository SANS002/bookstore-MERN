import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';

export default function MyOrders(){
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/myorders').then(res => setOrders(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h3>My Orders</h3>
      {orders.map(o => (
        <div key={o._id} style={{ border: '1px solid #ddd', marginBottom:8, padding:8 }}>
          <div>Order: {o._id}</div>
          <div>Date: {o.bookingDate}</div>
          <div>Status: {o.status}</div>
          <div>Total: ₹{o.totalAmount}</div>
          <div>Books:
            <ul>
              {o.books.map(b => <li key={b.bookId}>{b.title} x{b.qty}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
