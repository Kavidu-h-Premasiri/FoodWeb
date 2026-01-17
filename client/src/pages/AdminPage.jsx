import React, { useState } from "react";
import { Container, Form, Card } from "react-bootstrap";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminPage() {
  const [name,setName] = useState("")
  const [image,setImage] = useState("")
  const [des,setDes] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")


  const handleSubmit = (e)=>{
    e.preventDefault()

    //validation

    axios.post('http://localhost:3002/adminPage',{name,image,des,price,category})
            .then(result=>{
                console.log(result)
                alert("Successful")
            })
            .catch(err=>{
                console.log(err)
            })
  }
  
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Add Food Item</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                name="name"
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                name="image"
                onChange={(e)=>setImage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={(e)=>setDes(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (Rs)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={(e)=>setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Page</Form.Label>
              <Form.Select
                name="category"
                onChange={(e)=>setCategory(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="home">Home</option>
                <option value="fastfood">Fast Foods</option>
                <option value="chicken">Chicken & Meat</option>
                <option value="rice">Rice & Meals</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="w-100 m-1">Add Food</Button>
            <Button type="button" className="w-100 m-1" variant="danger">Log Out</Button>
            <Button type="button" className="w-100 m-1" variant="dark"   as={Link}  to="/adminTable">Current Food Store</Button>
          </Form>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminPage;
