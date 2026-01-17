import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../css/Home.css";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { addToCart } from "../components/cartUtils";
import axios from "axios";

function Home() {
  // fetch data from adminhome
  const [adminfoods, setAdminfoods] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3002/adminhome") // <-- updated endpoint
      .then(res => setAdminfoods(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <NavigationBar/>
      
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <h1>Delicious Food, Delivered Fresh</h1>
          <p>Order your favorite meals anytime, anywhere</p>
        </Container>
      </div>

      {/* FOOD CATEGORIES */}
      <Container className="mt-5">
        <h2 className="section-title">Food Categories</h2>
        <Row>
          {["Fast Food","Chicken & Meat","Rice & Meals"].map((cat, i) => (
            <Col md={3} sm={6} key={i} className="mb-4">
              <Card className="category-card">
                <Card.Body>
                  <h5>{cat}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Available Foods from AdminHome */}
      <Container className="mt-5">
        <h2 className="section-title">Favorite foods</h2>
        <Row>
          {adminfoods.length === 0 && (
            <p className="text-center">No foods available yet.</p>
          )}
          {adminfoods.map((food, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="food-card h-100">
                <Card.Img
                  variant="top"
                  src={food.image}
                  alt={food.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
          <Card.Body>
            <Card.Title>{food.name}</Card.Title>
            <Card.Text title={food.des}>
              {food.des.length > 80 ? food.des.substring(0, 80) + "..." : food.des}
            </Card.Text>
            <h5>Rs. {food.price}</h5>

            <Button
              variant="dark"
              className="w-100"
              onClick={() => addToCart(food)}
            >
              Add to Cart
            </Button>
          </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer/>
    </>
  );
}

export default Home;
