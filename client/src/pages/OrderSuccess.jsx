import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <h2>✅ Order Placed Successfully</h2>
      <p>Your order has been sent to admin.</p>

      <Button
        variant="primary"
        className="mt-3"
        onClick={() => navigate("/home")}
      >
        Back to Home
      </Button>
    </Container>
  );
}

export default OrderSuccess;
