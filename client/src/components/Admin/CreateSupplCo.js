import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "./Admin.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateSupplCo = ({ onCreateSupplCo }) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    getUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8080/get_all_Users");

    return response.data;
  };

  const handleClose = () => {
    setShow(false);
    setUsername("");
    setPassword("");
    setName("");
    setEmail("");
    setAddress("");
    setContact("");
  };
  const handleShow = () => setShow(true);

  const createSupplCo = () => {
    if (!username || !password || !name || !email || !address || !contact) {
      alert("Empty fields!");
      return;
    }

    for (var user of users) {
      if (user.username === username) {
        alert("Username already exists!");
        return;
      }
    }

    const newSupplCo = {
      id: uuidv4(),
      username: username,
      password: password,
      name: name,
      email: email,
      address: address,
      contact: contact,
    };

    onCreateSupplCo(newSupplCo);

    handleClose();
  };

  return (
    <>
      <Card onClick={() => handleShow()}>
        <Card.Header className="cardTitle">Create Supplier Company</Card.Header>
        <Card.Body>
          <Card.Text></Card.Text>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Supplier Company</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                Address
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                Contact
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => createSupplCo()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateSupplCo;
