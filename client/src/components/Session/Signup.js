import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useHistory } from "react-router";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
  let history = useHistory();

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [nacionality, setNacionality] = useState("");
  const [nacionalityDropdownTitle, setNacionalityDropdownTitle] = useState(
    "Select a nacionality"
  );
  const [nacionalities] = useState([
    "Portuguese",
    "English",
    "French",
    "German",
    "Spanish",
  ]);

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

  const createDonor = async () => {
    if (
      !username ||
      !password ||
      !name ||
      !birthdate ||
      !email ||
      !address ||
      !contact ||
      !nacionality
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

    const newDonor = {
      id: uuidv4(),
      username: username,
      password: password,
      name: name,
      birthdate:
        birthdate.getDate() +
        "/" +
        (birthdate.getMonth() + 1) +
        "/" +
        birthdate.getFullYear(),
      email: email,
      address: address,
      contact: contact,
      nacionality: nacionality,
    };

    try {
      await axios.post("http://localhost:8080/create_DONOR", newDonor);

      setUsername("");
      setPassword("");
      setBirthdate("");
      setName("");
      setEmail("");
      setAddress("");
      setContact("");
      setNacionality("");
      setNacionalityDropdownTitle("Select a nacionality");

      history.push("/");
      history.go(0);
    } catch (e) {
      console.log(e);
    }
    console.log(newDonor);
  };

  return (
    <>
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
            Birthdate
          </Form.Label>
          <Col sm="10">
            <DatePicker
              selected={birthdate}
              todayButton="Today"
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setBirthdate(date)}
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

        <DropdownButton title={nacionalityDropdownTitle}>
          {nacionalities.map((nac) => (
            <Dropdown.Item
              key={nac}
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setNacionalityDropdownTitle(nac);
                setNacionality(nac);
              }}
            >
              {nac}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Form>

      <Button variant="primary" onClick={() => createDonor()}>
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
