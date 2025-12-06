

import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

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
    <Container className="mt-4">
      <h2 className="mb-3">Books</h2>

      {/* Search Form */}
      <Form className="mb-4 d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Search by title"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Form.Control
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <Button variant="primary" onClick={search}>
          Search
        </Button>
      </Form>

      {/* Books Grid */}
      <Row>
        {books.map((b) => (
          <Col md={4} sm={6} xs={12} key={b._id} className="mb-3">
            <Card className="shadow-sm h-100">
              {b.itemImage && (
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${b.itemImage}`}
                  alt={b.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                  />


        
              )}
              <Card.Body>
                <Card.Title>{b.title}</Card.Title>
                <Card.Text>Author: {b.author}</Card.Text>
                <Card.Text>Price: ₹{b.price}</Card.Text>
                <Button as={Link} to={`/book/${b._id}`} variant="outline-primary" size="sm">
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

