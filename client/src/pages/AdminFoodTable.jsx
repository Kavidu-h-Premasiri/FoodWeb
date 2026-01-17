import React, { useEffect, useState } from "react"
import axios from "axios"
import { Table, Button, Container, Modal, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom" // for navigation

function AdminFoodTable() {
  const [foods, setFoods] = useState([])
  const [show, setShow] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)
  const navigate = useNavigate() // hook to redirect

  const fetchFoods = () => {
    axios.get("http://localhost:3002/adminFoods")
      .then(res => setFoods(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const deleteFood = (id) => {
    if (window.confirm("Delete this item?")) {
      axios.delete(`http://localhost:3002/adminFoods/${id}`)
        .then(fetchFoods)
    }
  }

  const handleEditClick = (food) => {
    setSelectedFood(food)
    setShow(true)
  }

  const handleUpdate = () => {
    axios.put(
      `http://localhost:3002/adminFoods/${selectedFood._id}`,
      selectedFood
    ).then(() => {
      setShow(false)
      fetchFoods()
    })
  }

  // Logout handler
  const handleLogout = () => {
    // Clear any stored login info (if you implement auth later)
    // For now, just redirect to login page
    navigate("/login")
  }

  return (
    <Container className="mt-5">
    <div className="d-flex align-items-center mb-3">
      <h3 className="me-auto">Admin Food List</h3>

      <Button
        variant="dark"
        className="me-2"
        as={Link}
        to="/adminPage"
      >
        Admin Page
      </Button>

      <Button
        variant="danger"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image URL</th>
            <th>Description</th>
            <th>Price (Rs)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {foods.map(food => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>
                <a href={food.image} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td>{food.des}</td>
              <td>{food.price}</td>
              <td>{food.category}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEditClick(food)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => deleteFood(food._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* EDIT MODAL */}
      {selectedFood && (
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Food</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={selectedFood.name}
                  onChange={e =>
                    setSelectedFood({ ...selectedFood, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  value={selectedFood.image}
                  onChange={e =>
                    setSelectedFood({ ...selectedFood, image: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedFood.des}
                  onChange={e =>
                    setSelectedFood({ ...selectedFood, des: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Price (Rs)</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedFood.price}
                  onChange={e =>
                    setSelectedFood({ ...selectedFood, price: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={selectedFood.category}
                  onChange={e =>
                    setSelectedFood({
                      ...selectedFood,
                      category: e.target.value
                    })
                  }
                >
                  <option value="home">Home</option>
                  <option value="fastfood">Fast Foods</option>
                  <option value="chicken">Chicken & Meat</option>
                  <option value="rice">Rice & Meals</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  )
}

export default AdminFoodTable
