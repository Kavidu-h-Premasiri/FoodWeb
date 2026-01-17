import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../css/NavigationBar.css";
import { useEffect, useState } from "react";
import { getCart } from "../components/cartUtils";


function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(totalQty);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

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

          {/* Navigation links */}
          <Nav className="ms-4">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>

            <NavDropdown title="Foods" id="foods-dropdown">
              <NavDropdown.Item as={Link} to="/foods">
                Fast Foods
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Cfoods">
                Chicken & Meat
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Rfoods">
                Rice & Meals
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Cart & Logout */}
          <Nav className="ms-auto align-items-center">

            {/* Cart Icon */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="me-3 position-relative"
            >
              <FaShoppingCart size={22} />
              <span className="cart-badge">{cartCount}</span>
            </Nav.Link>

            {/* Logout Button */}
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
