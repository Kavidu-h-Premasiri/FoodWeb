import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import axios from 'axios'
import { addToCart } from "../components/cartUtils";
import "../css/Home.css"

function FastFoods() {
  const [fastFoods, setFastFoods] = useState([])

  useEffect(() => {
    // Fetch data from AdminFF collection
    axios.get("http://localhost:3002/adminff")
      .then(res => setFastFoods(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <NavigationBar />

      <Container className="mt-5">
        <h2 className="section-title">Fast Foods</h2>
        <Row>
          {fastFoods.map((food, index) => (
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

      <Footer />
    </>
  )
}

export default FastFoods
