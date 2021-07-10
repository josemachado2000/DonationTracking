import { useState } from "react";

import "./Admin.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateSolInst = ({ onCreateSolInst }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createSolInst = () => {
    if (!name || !email || !contact) {
      alert("Empty fields!");
      return;
    }

    const newSolInst = {
      name: name,
      email: email,
      contact: contact,
    };

    onCreateSolInst(newSolInst);

    setName("");
    setEmail("");
    setContact("");
    handleClose();
  };

  return (
    <>
      <Card onClick={() => handleShow()}>
        <Card.Header className="cardTitle">
          Create Solidarity Institution
        </Card.Header>
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
          <Modal.Title>Create Solidarity Institution</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
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
          <Button variant="primary" onClick={() => createSolInst()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateSolInst;
