import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Failed to fetch book:", err));
  }, [id]);

  const addToCart = () => {
    if (!book) return; // guard against null
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      bookId: book._id,
      title: book.title,
      price: book.price,
      qty: 1
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
    navigate('/cart');
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  const apiBase = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

  return (
    <div style={{ padding: 16 }}>
      <h2>{book.title}</h2>
      {book.itemImage && (
        <img
          src={`${apiBase}/${book.itemImage}`}
          alt={book.title}
          style={{ width: 250 }}
        />
      )}
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Price: ₹{book.price}</p>
      <p>{book.description}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
