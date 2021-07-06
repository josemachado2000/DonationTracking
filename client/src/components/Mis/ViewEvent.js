import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

import EditEvent from "./EditEvent";

const ViewEvent = ({ event }) => {
  const progressBar = () => {
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
    <Router>
      <Form.Group as={Row}>
        <Form.Group as={Col} style={{ padding: "0px" }}>
          <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
            Progress
          </Form.Label>
          <Col sm="12">{progressBar()}</Col>
        </Form.Group>
      </Form.Group>

      <Button
        variant="dark"
        size="sm"
        style={{
          marginTop: "20px",
          width: "fit-content",
          alignSelf: "center",
        }}
      >
        Remove
      </Button>
      <Route
        path="/mis/events/event/edit"
        render={() => <EditEvent event={event} />}
      />
    </Router>
  );
};

export default ViewEvent;
