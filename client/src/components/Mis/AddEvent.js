import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "./Mis.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const AddEvent = ({ onAddEvent }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetReason, setTargetReason] = useState("");
  const [targetAmount, setTargetAmount] = useState(0.0);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [benefs, setBenefs] = useState([]);
  const [benefId, setBenefId] = useState("");
  const [benefDropdownTitle, setBenefDropdownTitle] = useState(
    "Select a Beneficiary"
  );
  const [supplCo, setSupplCo] = useState([]);
  const [supplCoId, setSupplCoId] = useState("");
  const [supplCoDropdownTitle, setSupplCoDropdownTitle] = useState(
    "Select a Supplier Company"
  );

  const [show, setShow] = useState(false);

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameBenef, setNameBenef] = useState("");
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
    const getBenefs = async () => {
      const benefs = await fetchBenefs();
      setBenefs(benefs);
    };
    getBenefs();

    const getUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    getUsers();

    const getSupplCo = async () => {
      const supplCo = await fetchSupplCo();
      setSupplCo(supplCo);
    };
    getSupplCo();
  }, []);

  const fetchBenefs = async () => {
    const response = await axios.get("http://localhost:8080/get_all_BENEFS");
    return response.data;
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8080/get_all_Users");

    return response.data;
  };

  const fetchSupplCo = async () => {
    const response = await axios.get("http://localhost:8080/get_all_SUPPLCO");

    return response.data;
  };

  const addEvent = () => {
    if (
      !name ||
      !description ||
      !targetReason ||
      !targetAmount ||
      !beginDate ||
      !endDate ||
      !benefId ||
      !supplCoId
    ) {
      alert("Empty fields!");
      return;
    }

    onAddEvent({
      name,
      description,
      targetReason,
      targetAmount,
      beginDate,
      endDate,
      benefId,
      supplCoId,
    });

    setName("");
    setDescription("");
    setTargetReason("");
    setTargetAmount("");
    setBeginDate("");
    setEndDate("");
    setBenefId("");
    setSupplCoId("");
    setBenefDropdownTitle("Select a Beneficiary");
    setSupplCoDropdownTitle("Select a Supplier Company");
  };

  const createBeneficiary = async () => {
    if (
      !username ||
      !password ||
      !nameBenef ||
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

    const newBenef = {
      id: uuidv4(),
      username: username,
      password: password,
      name: nameBenef,
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
      await axios.post("http://localhost:8080/create_BENEF", newBenef);
      setBenefs([...benefs, newBenef]);
      setBenefDropdownTitle(newBenef.name);
      setBenefId(newBenef.id);
    } catch (e) {
      console.log(e);
    }

    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setUsername("");
    setPassword("");
    setNameBenef("");
    setBirthdate("");
    setEmail("");
    setAddress("");
    setContact("");
    setNacionality("");
    setNacionalityDropdownTitle("Select a nacionality");
  };
  const handleShow = () => setShow(true);

  return (
    <div className="addEvent_page">
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{ marginTop: "10px" }}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{ marginTop: "10px" }}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Target Reason
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={targetReason}
                onChange={(e) => setTargetReason(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Target Amount
            </Form.Label>
            <Col sm="10" style={{ display: "flex" }}>
              <Form.Control
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
              <InputGroup.Text style={{ width: "8%" }}>€</InputGroup.Text>
            </Col>
          </Form.Group>
        </Form.Group>

        <Form.Group as={Row} style={{ marginTop: "20px" }}>
          <Form.Group as={Col}>
            <DropdownButton
              title={benefDropdownTitle}
              style={{ float: "left" }}
              variant={"secondary"}
            >
              {benefs.length === 0 ? (
                <Dropdown.Item onClick={() => handleShow()}>
                  Add Beneficiary
                </Dropdown.Item>
              ) : (
                <>
                  {benefs.map((benef) => (
                    <Dropdown.Item
                      key={benef.id}
                      as="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setBenefDropdownTitle(benef.name);
                        setBenefId(benef.id);
                      }}
                    >
                      {benef.name}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handleShow()}>
                    Add Beneficiary
                  </Dropdown.Item>
                </>
              )}
            </DropdownButton>
          </Form.Group>

          <Form.Group as={Col}>
            <DropdownButton
              title={supplCoDropdownTitle}
              style={{ float: "left" }}
              variant={"secondary"}
            >
              {supplCo.length === 0 ? (
                <Dropdown.ItemText>
                  Doenst exist Supplier Companies
                </Dropdown.ItemText>
              ) : (
                supplCo.map((supplCo) => (
                  <Dropdown.Item
                    key={supplCo.id}
                    as="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSupplCoDropdownTitle(supplCo.name);
                      setSupplCoId(supplCo.id);
                    }}
                  >
                    {supplCo.name}
                  </Dropdown.Item>
                ))
              )}
            </DropdownButton>
          </Form.Group>
        </Form.Group>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Beneficiary</Modal.Title>
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
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={nameBenef}
                    onChange={(e) => setNameBenef(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} style={{ marginTop: "10px" }}>
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
                title={nacionalityDropdownTitle}
                style={{ marginTop: "20px" }}
                variant={"secondary"}
              >
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
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                createBeneficiary();
              }}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>

        <Form.Group as={Row} style={{ marginTop: "10px" }}>
          <Form.Group as={Col} style={{ paddingLeft: "15px" }}>
            <Form.Label
              column
              sm="10"
              style={{ fontWeight: "bold", paddingLeft: "0px" }}
            >
              Begin Date
            </Form.Label>
            <Col sm="10" style={{ paddingLeft: "0px" }}>
              <DatePicker
                todayButton="Today"
                dateFormat="dd/MM/yyyy"
                selected={beginDate}
                onChange={(date) => setBeginDate(date)}
                selectsStart
                startDate={beginDate}
                endDate={endDate}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label
              column
              sm="10"
              style={{ padding: "0px", fontWeight: "bold" }}
            >
              End Date
            </Form.Label>
            <Col sm="10" style={{ padding: "0px" }}>
              <DatePicker
                todayButton="Today"
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={beginDate}
                endDate={endDate}
                minDate={beginDate}
              />
            </Col>
          </Form.Group>
        </Form.Group>
      </Form>

      <>
        <div>
          <Link to="/mis" className="btn btn-dark btn-sm cancel">
            Cancel
          </Link>

          <Link
            to="/mis"
            className="btn btn-dark btn-sm add"
            onClick={() => addEvent()}
          >
            Add
          </Link>
        </div>
      </>
    </div>
  );
};

export default AddEvent;
