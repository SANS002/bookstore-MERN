import React, { useState } from 'react';
import API from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function AddBook(){
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [price,setPrice]=useState('');
  const [genre,setGenre]=useState('');
  const [description,setDescription]=useState('');
  const [file,setFile]=useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('author', author);
      fd.append('price', price);
      fd.append('genre', genre);
      fd.append('description', description);
      if (file) fd.append('itemImage', file);
      await API.post('/books', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      alert('Added');
      navigate('/seller/myproducts');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 16 }}>
      <h3>Add Book</h3>
      <div><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /></div>
      <div><input placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} /></div>
      <div><input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} /></div>
      <div><input placeholder="Genre" value={genre} onChange={e=>setGenre(e.target.value)} /></div>
      <div><textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} /></div>
      <div><input type="file" onChange={e=>setFile(e.target.files[0])} /></div>
      <button type="submit">Add Book</button>
    </form>
  );
}
