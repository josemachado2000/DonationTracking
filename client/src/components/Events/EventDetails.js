import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Donate from "../Donations/Donate";

import "./Events.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventDetails = ({
  event,
  component,
  onDonateSuccess,
  onDonate,
  onDisableEvent,
}) => {
  const [user] = useState(JSON.parse(localStorage.getItem("loggedUser")));
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [targetReason, setTargetReason] = useState(event.targetReason);
  const [targetAmount, setTargetAmount] = useState(event.targetAmount);
  const [endDate, setEndDate] = useState(Date(event.endDate));

  //Order Modal
  const [orderDescription, setOrderDescription] = useState("");
  const [orderDate, setOrderDate] = useState(Date());

  const [allowEdit, setAllowEdit] = useState(true);
  const [show, setShow] = useState(false);

  const [benef, setBenef] = useState({});

  useEffect(() => {
    const getBenef = async () => {
      const benef = await fetchBenef();
      setBenef(benef[0]);
    };
    getBenef();
  }, []);

  const fetchBenef = async () => {
    const benefId = { benefId: event.benefId };

    const response = await axios.post(
      "http://localhost:8080/get_BENEF_by_Id",
      benefId
    );

    return response.data;
  };

  const onEditClick = () => {
    setAllowEdit(!allowEdit);
  };

  const onSaveClick = async () => {
    if (
      !name ||
      !description ||
      !targetReason ||
      !targetAmount ||
      !event.beginDate ||
      !endDate
    ) {
      alert("Empty fields!");
      return;
    }

    const newEvent = {
      id: uuidv4(),
      oldId: event.id,
      name: name,
      description: description,
      targetReason: targetReason,
      targetAmount: targetAmount,
      currentAmount: event.currentAmount,
      beginDate: event.beginDate,
      endDate:
        new Date(endDate).getDate() +
        "/" +
        (new Date(endDate).getMonth() + 1) +
        "/" +
        new Date(endDate).getFullYear(),
      isEnabled: event.isEnabled,
      misId: user.id,
      solInstId: user.solInstId,
      benefId: event.benefId,
      supplCoId: event.supplCoId,
    };

    try {
      await axios.post("http://localhost:8080/create_EVENT", newEvent);
      setAllowEdit(!allowEdit);
    } catch (e) {
      console.log(e);
    }
  };

  const progressBar = () => {
    const now = ((event.currentAmount / event.targetAmount) * 100).toFixed(2);
    const progressInstance = (
      <ProgressBar
        animated
        now={now}
        label={`${now}% | ${event.currentAmount.toFixed(2)}€`}
      />
    );

    return progressInstance;
  };

  const disableEvent = (event) => {
    const newEvent = {
      id: uuidv4(),
      oldId: event.id,
      name: event.name,
      description: event.description,
      targetReason: event.targetReason,
      targetAmount: event.targetAmount,
      currentAmount: event.currentAmount,
      beginDate: event.beginDate,
      endDate: event.endDate,
      isEnabled: 0,
      misId: event.misId,
      solInstId: event.solInstId,
      benefId: event.benefId,
      supplCoId: event.supplCoId,
    };

    onDisableEvent(newEvent);
  };

  const createOrder = async (event) => {
    if (!description || !orderDate) {
      alert("Empty fields!");
      return;
    }
    console.log(event);
    const newOrder = {
      id: uuidv4(),
      // oldId: event.id,
      description: orderDescription,
      date:
        new Date(orderDate).getDate() +
        "/" +
        (new Date(orderDate).getMonth() + 1) +
        "/" +
        new Date(orderDate).getFullYear(),
      misId: user.id,
      supplCoId: event.supplCoId,
      eventId: event.id,
    };

    try {
      await axios.post("http://localhost:8080/create_ORDER", newOrder);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setShow(false);
    setOrderDescription("");
    setOrderDate(new Date());
  };
  const handleShow = () => setShow(true);

  return (
    <div
      className={`${
        component === "Event.js" ? "eventDetails" : "solInst_eventDetails"
      }`}
    >
      <Form>
        <Form.Group as={Row} style={{ marginBottom: "10px" }}>
          <Form.Label
            column
            sm="2"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              plaintext
              readOnly={allowEdit}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ height: "fit-content" }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label
            column
            sm="2"
            style={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              plaintext
              readOnly={allowEdit}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label
              column
              sm="10"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Target Reason
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly={allowEdit}
                value={targetReason}
                onChange={(e) => setTargetReason(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label
              column
              sm="10"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Target Amount
            </Form.Label>
            <Col sm="10" style={{ display: "flex" }}>
              <Form.Control
                plaintext
                readOnly={targetAmount}
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
              <InputGroup.Text style={{ width: "7%" }}>€</InputGroup.Text>
            </Col>
          </Form.Group>
        </Form.Group>

        <Form.Group as={Row} style={{ marginBottom: "10px" }}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label
              column
              sm="10"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Beneficiary
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly value={benef.name} />
            </Col>
          </Form.Group>
        </Form.Group>

        {progressBar()}

        <Form.Group as={Row}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label
              column
              sm="10"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Begin Date
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly value={event.beginDate} />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label
              column
              sm="10"
              style={{ fontWeight: "bold", fontSize: "18px" }}
            >
              End Date
            </Form.Label>
            <Col sm="10">
              {component === "Event.js" ? (
                <Form.Control plaintext readOnly value={event.endDate} />
              ) : (
                <DatePicker
                  selected={new Date(endDate)}
                  readOnly={allowEdit}
                  todayButton="Today"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setEndDate(date)}
                  style={{ width: "100%" }}
                />
              )}
            </Col>
          </Form.Group>
        </Form.Group>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{event.name} - Order</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group as={Row} style={{ marginTop: "10px" }}>
                <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                  Description
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    as="textarea"
                    value={orderDescription}
                    onChange={(e) => setOrderDescription(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} style={{ marginTop: "10px" }}>
                <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                  Date
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    readOnly
                    value={
                      new Date(orderDate).getDate() +
                      "/" +
                      (new Date(orderDate).getMonth() + 1) +
                      "/" +
                      new Date(orderDate).getFullYear()
                    }
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="secondary" onClick={() => createOrder(event)}>
              Create Order
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
      {component === "MisEvents.js" ? (
        allowEdit ? (
          <>
            <Button
              variant="dark"
              size="sm"
              onClick={() => onEditClick()}
              style={{
                marginTop: "20px",
                width: "fit-content",
                alignSelf: "center",
              }}
            >
              Edit
            </Button>

            <div style={{ float: "right", marginTop: "20px" }}>
              <Button
                variant="btn btn-dark btn-sm"
                onClick={() => disableEvent(event)}
                style={{ marginRight: "10px" }}
              >
                Disable
              </Button>

              <Button
                variant="btn btn-dark btn-sm"
                onClick={() => handleShow()}
              >
                Create Order
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button
              variant="dark"
              size="sm"
              onClick={() => onEditClick()}
              style={{
                marginTop: "20px",
                width: "fit-content",
                alignSelf: "center",
              }}
            >
              Close
            </Button>

            <Button
              variant="dark"
              size="sm"
              onClick={() => onSaveClick()}
              style={{
                marginTop: "20px",
                width: "fit-content",
                alignSelf: "center",
                float: "right",
              }}
            >
              Save
            </Button>
          </>
        )
      ) : (
        <Donate
          event={event}
          onDonateSuccess={onDonateSuccess}
          onDonate={onDonate}
        />
      )}
    </div>
  );
};

export default EventDetails;
