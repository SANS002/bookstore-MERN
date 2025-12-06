import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { Link } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const search = async () => {
    try {
      const res = await API.get('/books', { params: { q, genre } });
      setBooks(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Books</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Search by title"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
        gap: 12
      }}>
        {books.map(b => (
          <div key={b._id} style={{ border: '1px solid #ccc', padding: 10 }}>
            {b.itemImage && (
              <img
                src={`${import.meta.env.VITE_API_URL?.replace('/api','')}/${b.itemImage}`}
                alt={b.title}
                style={{ width: '100%', height: 150, objectFit: 'cover' }}
              />
            )}
            <h4>{b.title}</h4>
            <p>Author: {b.author}</p>
            <p>Price: ₹{b.price}</p>
            <Link to={`/book/${b._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
