import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCart, saveCart } from "../components/cartUtils";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(getCart());
  }, []);

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updated);
    saveCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map(item =>
      item._id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCart(updated);
    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    saveCart(updated);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    const orderData = {
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image
      })),
      totalPrice
    };

    await axios.post("http://localhost:3002/orders", orderData);

    saveCart([]);       // clear cart
    setCart([]);
    navigate("/order-success");
  };

  return (
    <>
      <NavigationBar />

      <Container className="mt-5">
        <h2>Your Cart</h2>

        <Table striped bordered hover className="mt-4 text-center">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cart.length === 0 && (
              <tr>
                <td colSpan="6">Cart is empty</td>
              </tr>
            )}

            {cart.map(item => (
              <tr key={item._id}>
                <td>
                  <img src={item.image} alt={item.name} width="70" />
                </td>
                <td>{item.name}</td>
                <td>Rs. {item.price}</td>
                <td>
                  <Button size="sm" onClick={() => decreaseQty(item._id)}>-</Button>
                  <span className="mx-2">{item.qty}</span>
                  <Button size="sm" onClick={() => increaseQty(item._id)}>+</Button>
                </td>
                <td>Rs. {item.price * item.qty}</td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h4 className="text-end">Grand Total: Rs. {totalPrice}</h4>

        <div className="d-flex justify-content-end mt-3">
          <Button
            variant="success"
            size="lg"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Cart;
