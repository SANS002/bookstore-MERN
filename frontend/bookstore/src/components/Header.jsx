
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className="py-3 shadow-lg"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: 800,
            fontSize: "1.8rem",
            background: "linear-gradient(135deg,#6366f1,#ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BookStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nav" />

        <Navbar.Collapse id="nav">
          {/* LEFT LINKS */}
          <Nav className="me-auto d-flex align-items-center gap-2">
            <Nav.Link as={Link} to="/" className="fw-semibold">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="fw-semibold">
              Cart
            </Nav.Link>

            {user?.role === "seller" && (
              <>
                <Nav.Link as={Link} to="/seller/add" className="fw-semibold">
                  Add Book
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/seller/myproducts"
                  className="fw-semibold"
                >
                  My Products
                </Nav.Link>
              </>
            )}

            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/admin" className="fw-semibold">
                Admin
              </Nav.Link>
            )}
          </Nav>

          {/* RIGHT SIDE USER ACTIONS */}
          <Nav className="d-flex align-items-center gap-3">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <Navbar.Text className="fw-semibold">
                  Hi, {user.name}
                </Navbar.Text>

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="px-3 py-1 fw-bold"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="fw-semibold btn btn-outline-primary px-3 py-1"
                  style={{ borderRadius: "8px" }}
                >
                  Login
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="fw-semibold btn btn-primary px-3 py-1 text-white"
                  style={{ borderRadius: "8px" }}
                >
                  Signup
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
