import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Event = ({ event }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Card>
        <Card.Header>{event.name}</Card.Header>
        <Card.Body>
          <Card.Title>{event.description}</Card.Title>
          <Card.Text>{event.targetAmount}</Card.Text>
          <Button variant="primary">Doar</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Event;
