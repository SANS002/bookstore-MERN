import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';

export default function MyProducts(){
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    API.get('/books').then(res => {
      const my = res.data.filter(b => b.sellerId && b.sellerId === user?.id); // note: sellerId stored as string sometimes
      setBooks(my);
    }).catch(console.error);
  }, [user]);

  const del = async (id) => {
    if (!window.confirm('Delete?')) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter(b => b._id !== id));
    } catch (err) { alert('Error'); }
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>My Products</h3>
      {books.map(b => (
        <div key={b._id} style={{ border: '1px solid #ddd', padding: 8 }}>
          <div>{b.title} - ₹{b.price}</div>
          <button onClick={()=>del(b._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
