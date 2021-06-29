import { React, useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Donate = () => {
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState(0.0);

  const onClickDonate = (e) => {
    e.preventDefault();
    if (showDonate === false) {
      setShowDonate(true);
      return;
    } else {
      alert("DONATE");
    }
  };

  const onClickCloseDonate = (e) => {
    e.preventDefault();
    setShowDonate(false);
  };

  return (
    <>
      {showDonate ? (
        <Form style={{ marginTop: "20px" }}>
          <Form.Group as={Row}>
            <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
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
        </Form>
      ) : (
        ""
      )}
      {showDonate ? (
        <>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => onClickCloseDonate(e)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => onClickDonate(e)}
          >
            Donate
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => onClickDonate(e)}
        >
          Donate
        </Button>
      )}
    </>
  );
};

export default Donate;
