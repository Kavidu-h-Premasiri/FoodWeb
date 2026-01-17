import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import axios from 'axios'
import { Container, Card, Button, Form, Table } from "react-bootstrap"

function Adminrm() {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [des, setDes] = useState("")
  const [price, setPrice] = useState("")
  const [adminrms, setAdminrms] = useState([])
  const [editId, setEditId] = useState(null)

  const fetchData = () => {
    axios.get("http://localhost:3002/adminrm")
      .then(res => setAdminrms(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { name, image, des, price }

    if (editId) {
      // Edit existing item
      axios.put(`http://localhost:3002/adminrm/${editId}`, data)
        .then(() => {
          alert("Food updated successfully")
          resetForm()
          fetchData()
        })
        .catch(err => console.log(err))
    } else {
      // Add new item
      axios.post("http://localhost:3002/adminrm", data)
        .then(() => {
          alert("Food added successfully")
          resetForm()
          fetchData()
        })
        .catch(err => console.log(err))
    }
  }

  const handleEdit = (item) => {
    setEditId(item._id)
    setName(item.name)
    setImage(item.image)
    setDes(item.des)
    setPrice(item.price)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:3002/adminrm/${id}`)
        .then(() => fetchData())
        .catch(err => console.log(err))
    }
  }

  const resetForm = () => {
    setEditId(null)
    setName("")
    setImage("")
    setDes("")
    setPrice("")
  }

  return (
    <>
      <AdminNav />

      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>{editId ? "Edit Food Item" : "Add Food Item"}</Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Control className="mb-2" placeholder="Food name"
                value={name} onChange={e => setName(e.target.value)} required />

              <Form.Control className="mb-2" placeholder="Image URL"
                value={image} onChange={e => setImage(e.target.value)} required />

              <Form.Control className="mb-2" as="textarea" rows={3}
                value={des} onChange={e => setDes(e.target.value)} required />

              <Form.Control
                className="mb-2"
                type="number"
                min="0"
                step="1"
                value={price}
                onChange={(e) => {
                  const value = e.target.value
                  if (value >= 0) {
                    setPrice(Number(value))
                  }
                }}
                required
              />

              <Button type="submit" className="w-100">
                {editId ? "Update Food" : "Add Food"}
              </Button>

              {editId && (
                <Button
                  variant="secondary"
                  className="w-100 mt-2"
                  onClick={resetForm}
                >
                  Cancel Edit
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>

        <Table striped bordered hover className="mt-4 text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminrms.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td><img src={item.image} alt={item.name} width="80" /></td>
                <td>{item.des}</td>
                <td>{item.price}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(item)}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Adminrm
