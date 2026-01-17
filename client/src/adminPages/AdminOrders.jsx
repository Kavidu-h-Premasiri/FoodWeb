import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import AdminNav from "../components/AdminNav";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/orders")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div>
    <AdminNav/>
    <Container className="mt-5">
      <h2>Admin Orders</h2>

      {orders.map((order, index) => (
        <Table key={order._id} bordered className="mt-4">
          <thead>
            <tr>
              <th colSpan="5">
                Order #{index + 1} | Total: Rs. {order.totalPrice}
              </th>
            </tr>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map(item => (
              <tr key={item.productId}>
                <td>
                  <img src={item.image} width="60" alt="" />
                </td>
                <td>{item.name}</td>
                <td>Rs. {item.price}</td>
                <td>{item.qty}</td>
                <td>Rs. {item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ))}
    </Container>
    </div>
  );
}

export default AdminOrders;
