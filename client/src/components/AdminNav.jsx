import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import '../css/NavigationBar.css'

function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data if you have (example)
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        
        {/* Logo & Shop Name */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Cloth Shop Logo"
            width="60"
            height="60"
            className="me-2"
          />
          <strong>KaviFood</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Navigation links slightly right from logo */}
          <Nav className="ms-4">
            <Nav.Link as={Link} to="/adminhome">Home</Nav.Link>
            <Nav.Link as={Link} to="/adminff">Fast Foods</Nav.Link>
            <Nav.Link as={Link} to="/admincm">Chicken & Meat</Nav.Link>
            <Nav.Link as={Link} to="/adminrm">Rice & Meals</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
          </Nav>

          {/* Logout Button (Right Side) */}
          <Nav className="ms-auto">
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
