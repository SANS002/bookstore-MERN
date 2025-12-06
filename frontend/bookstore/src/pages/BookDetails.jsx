

import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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
    return <Container className="mt-4"><p>Loading...</p></Container>;
  }

  const apiBase = import.meta.env.VITE_API_URL?.replace('/api', '') || '';
  // const apiBase = window.location.origin;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Row className="g-0">
              {book.itemImage && (
                <Col md={4} className="d-flex align-items-center justify-content-center p-3">
                  <div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>
                  <Card.Img
                    src={`http://localhost:5000/uploads/${book.itemImage}`}
                    alt={book.title}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                  />
                  </div>
                </Col>
              )}
              <Col md={book.itemImage ? 8 : 12}>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
                  <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
                  <Card.Text><strong>Price:</strong> ₹{book.price}</Card.Text>
                  <Card.Text>{book.description}</Card.Text>
                  <Button variant="primary" onClick={addToCart}>
                    Add to Cart
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
