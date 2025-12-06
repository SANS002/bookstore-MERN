
import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, sellers: 0, books: 0 });

  useEffect(() => {
    API.get('/admin/stats')
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Admin Dashboard</h3>

      {/* Stats Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>{stats.users}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Sellers</Card.Title>
              <Card.Text>{stats.sellers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Books</Card.Title>
              <Card.Text>{stats.books}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Actions */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <Card.Title>Manage Users</Card.Title>
              <Button as={Link} to="/admin/users" variant="primary">
                Go
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
