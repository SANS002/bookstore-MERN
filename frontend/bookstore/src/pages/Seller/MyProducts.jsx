

import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function MyProducts() {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    API.get('/books')
      .then(res => {
        const my = res.data.filter(
          b => b.sellerId && b.sellerId === user?.id
        ); // sellerId stored as string sometimes
        setBooks(my);
      })
      .catch(console.error);
  }, [user]);

  const del = async (id) => {
    if (!window.confirm('Delete?')) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter(b => b._id !== id));
    } catch (err) {
      alert('Error');
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">My Products</h3>
      <Row>
        {books.map(b => (
          <Col md={4} sm={6} xs={12} key={b._id} className="mb-3">
            <Card className="shadow-sm h-100">
              {b.imageUrl && (
                <Card.Img
                  variant="top"
                  src={b.imageUrl}
                  alt={b.title}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{b.title}</Card.Title>
                <Card.Text>₹{b.price}</Card.Text>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => del(b._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
