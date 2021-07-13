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
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateMis = ({ solInsts, onCreateMis }) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [solInstId, setSolInstId] = useState("");
  const [instDropdownTitle, setInstDropdownTitle] = useState(
    "Select a Solidarity Institution"
  );

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
    setSolInstId("");
    setInstDropdownTitle("Select a Solidarity Institution");
  };
  const handleShow = () => setShow(true);

  const createMis = () => {
    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !address ||
      !contact ||
      !solInstId
    ) {
      alert("Empty fields!");
      return;
    }

    for (var user of users) {
      if (user.username === username) {
        alert("Username already exists!");
        return;
      }
    }

    const newMis = {
      id: uuidv4(),
      oldId: uuidv4(),
      username: username,
      password: password,
      name: name,
      email: email,
      address: address,
      contact: contact,
      solInstId: solInstId,
    };

    onCreateMis(newMis);

    handleClose();
  };

  return (
    <>
      <Card onClick={() => handleShow()}>
        <Card.Header className="cardTitle">
          Create Member of Solidarity Institution
        </Card.Header>
        <Card.Body>
          <FontAwesomeIcon icon={faUser} size="10x" style={{ color: "gray" }} />
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Member of Solidarity Institution</Modal.Title>
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

            <Form.Group as={Row} style={{ marginTop: "10px" }}>
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

            <Form.Group as={Row} style={{ marginTop: "10px" }}>
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

            <Form.Group as={Row} style={{ marginTop: "10px" }}>
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

            <Form.Group as={Row} style={{ marginTop: "10px" }}>
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

            <Form.Group as={Row} style={{ marginTop: "10px" }}>
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

            <DropdownButton
              title={instDropdownTitle}
              variant="secondary"
              style={{ marginTop: "20px" }}
            >
              {solInsts.length === 0 ? (
                <Dropdown.ItemText>
                  No Solidarity Institutions
                </Dropdown.ItemText>
              ) : (
                solInsts.map((solInst) => (
                  <Dropdown.Item
                    key={solInst.id}
                    as="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setInstDropdownTitle(solInst.name);
                      setSolInstId(solInst.id);
                    }}
                  >
                    {solInst.name}
                  </Dropdown.Item>
                ))
              )}
            </DropdownButton>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => createMis()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateMis;
