import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">

          {/* BRAND */}
          <Col md={4} className="mb-4">
            <h4 className="footer-logo">KaviFood</h4>
            <p className="footer-text">
              Fresh, delicious food made with quality ingredients.
              Order your favorite meals anytime.
            </p>
          </Col>

          {/* QUICK LINKS */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/foods">Foods</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          {/* CONTACT INFO */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p className="footer-text">📍 Colombo, Sri Lanka</p>
            <p className="footer-text">📞 +94 72 985 2612</p>
            <p className="footer-text">✉️ kavindu@gmail.com</p>
          </Col>

        </Row>

        {/* COPYRIGHT */}
        <Row>
          <Col className="text-center footer-bottom">
            © {new Date().getFullYear()} KaviFood. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
