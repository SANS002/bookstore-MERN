

import React, { useState } from 'react';
import API from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [flatno, setFlatno] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const remove = (index) => {
    const c = [...cart];
    c.splice(index, 1);
    setCart(c);
    localStorage.setItem('cart', JSON.stringify(c));
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    const total = cart.reduce((s, c) => s + Number(c.price || 0), 0).toString();
    try {
      await API.post('/orders', { books: cart, totalAmount: total, flatno, pincode, city, state });
      localStorage.removeItem('cart');
      alert('Order placed');
      navigate('/myorders');
    } catch (err) {
      alert(err.response?.data?.msg || 'Order failed');
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <Row>
            {cart.map((c, i) => (
              <Col md={6} key={i} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title>{c.title}</Card.Title>
                      <Card.Text>₹{c.price}</Card.Text>
                    </div>
                    <Button variant="danger" size="sm" onClick={() => remove(i)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Address Form */}
          <Card className="shadow-sm mt-4">
            <Card.Body>
              <h5 className="mb-3">Shipping Address</h5>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Control
                      placeholder="Flat no"
                      value={flatno}
                      onChange={(e) => setFlatno(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Control
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Col>
                </Row>
                <Button variant="primary" className="w-100" onClick={placeOrder}>
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}
