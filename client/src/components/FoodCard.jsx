import { Card, Button } from "react-bootstrap"

function FoodCard({ food }) {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={food.image} height="200" />
      <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        <Card.Text>{food.des}</Card.Text>
        <h6>Rs. {food.price}</h6>
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  )
}

export default FoodCard
