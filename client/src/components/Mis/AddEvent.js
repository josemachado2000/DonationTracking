import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEvent = ({ onAddEvent }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetReason, setTargetReason] = useState("");
  const [targetAmount, setTargetAmount] = useState(0.0);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const addEvent = () => {
    if (!name || !description || !targetReason || !targetAmount) {
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
    });

    setName("");
    setDescription("");
    setTargetReason("");
    setTargetAmount("");
  };

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

        <Form.Group as={Row}>
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
            <Col sm="10">
              <Form.Control
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Begin Date
            </Form.Label>
            <Col sm="10">
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

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              End Date
            </Form.Label>
            <Col sm="10">
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
          <Link to="/mis/events" className="btn btn-primary cancel">
            Cancel
          </Link>
          <div>
            <Link
              to="/mis/events"
              className="btn btn-primary add"
              onClick={addEvent}
            >
              Add
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default AddEvent;
