import { useState } from "react";
import axios from "axios";

import Donate from "../Donations/Donate";

import "./Events.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventDetails = ({ event, component, onDonateSuccess }) => {
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [targetReason, setTargetReason] = useState(event.targetReason);
  const [targetAmount, setTargetAmount] = useState(event.targetAmount);
  const [endDate, setEndDate] = useState(Date(event.endDate));

  const [allowEdit, setAllowEdit] = useState(true);

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
      misId: "35347612-de7a-4334-9357-fd3cbe81a382",
      solInstId: "a1d6641e-b3a7-4b71-97b7-c738bbd4dbaa",
    };

    console.log(newEvent);
    try {
      await axios.post("http://localhost:8080/create_EVENT", newEvent);
    } catch (e) {
      console.log(e);
    }
  };

  const progressBar = () => {
    console.log(event);
    const now = ((event.currentAmount / event.targetAmount) * 100).toFixed(2);
    const progressInstance = (
      <ProgressBar
        animated
        now={now}
        label={`${now}% | ${event.currentAmount}€`}
      />
    );

    return progressInstance;
  };

  return (
    <div
      className={`${
        component === "Event.js" ? "eventDetails" : "solInst_eventDetails"
      }`}
    >
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly={allowEdit}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
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
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
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
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Target Amount
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly={targetAmount}
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form.Group>

        {progressBar()}

        <Form.Group as={Row}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Begin Date
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly value={event.beginDate} />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
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
                />
              )}
            </Col>
          </Form.Group>
        </Form.Group>
      </Form>
      {component === "MisEvents.js" ? (
        allowEdit ? (
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
              }}
            >
              Save
            </Button>
          </>
        )
      ) : (
        <Donate event={event} onDonateSuccess={onDonateSuccess} />
      )}
    </div>
  );
};

export default EventDetails;
