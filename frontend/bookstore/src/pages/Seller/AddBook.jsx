
import React, { useState } from 'react';
import API from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
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

      await API.post('/books', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Added');
      navigate('/seller/myproducts');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={submit} className="p-4 shadow-sm bg-white rounded">
        <h3 className="mb-3">Add Book</h3>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Add Book
        </Button>
      </Form>
    </Container>
  );
}
