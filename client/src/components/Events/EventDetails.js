import React from "react";
import { Link } from "react-router-dom";

import Donate from "../Donations/Donate";

import "./Events.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EventDetails = ({ event }) => {
  const onClickDonate = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="eventDetails">
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={event.name} />
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
              readOnly
              value={event.description}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Target Reason
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly value={event.targetReason} />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Target Amount
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                value={event.targetAmount + "€"}
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
              <Form.Control plaintext readOnly value={event.beginDate} />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              End Date
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly value={event.endDate} />
            </Col>
          </Form.Group>
        </Form.Group>
      </Form>
      <Link to="/create_donate" component={Donate} />
      {/* <Button type="submit" onClick={(e) => onClickDonate(e)}>
        Donate
      </Button> */}
    </div>
  );
};

export default EventDetails;
