

import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { Container, Card, ListGroup, Row, Col } from 'react-bootstrap';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/myorders')
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-3">My Orders</h3>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <Row>
          {orders.map(o => (
            <Col md={6} key={o._id} className="mb-3">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Order #{o._id}</Card.Title>
                  <Card.Text><strong>Date:</strong> {o.bookingDate}</Card.Text>
                  <Card.Text><strong>Status:</strong> {o.status}</Card.Text>
                  <Card.Text><strong>Total:</strong> ₹{o.totalAmount}</Card.Text>
                  <Card.Subtitle className="mt-3 mb-2">Books:</Card.Subtitle>
                  <ListGroup variant="flush">
                    {o.books.map(b => (
                      <ListGroup.Item key={b.bookId}>
                        {b.title} × {b.qty}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
