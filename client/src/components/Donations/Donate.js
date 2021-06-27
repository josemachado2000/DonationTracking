import { React, useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Donate = () => {
  const [amount, setAmount] = useState(0.0);

  const onClickDonate = (e) => {
    e.preventDefault();
    if (amount === 0.0) {
      alert("FAILED");
    } else {
      alert("NOICE");
    }
  };

  return (
    <Form>
      {/* <Form.Group as={Row}>
        <Form.Label column sm="2">
          Para
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue="Armindo Costa" />
        </Col>
      </Form.Group> */}

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Amount
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            placeholder="Enter the donation value"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={(e) => onClickDonate(e)}>
        Donate
      </Button>
    </Form>
  );
};

export default Donate;
