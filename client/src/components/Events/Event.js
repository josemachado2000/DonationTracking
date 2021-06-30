import { React, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import EventDetails from "./EventDetails";

const Event = ({ event }) => {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <Router>
      <div className="event_eventDetails">
        <div className="event">
          <Card>
            <Card.Header className="cardTitle">{event.name}</Card.Header>
            <Card.Body>
              <Card.Text>{event.description}</Card.Text>
              {showDonate === false ? (
                <div className="cardButton">
                  <Link
                    to="/donate"
                    className="btn btn-primary"
                    onClick={() => setShowDonate(!showDonate)}
                  >
                    Donate
                  </Link>
                </div>
              ) : (
                <div className="cardButton">
                  <Link
                    to="/"
                    className="btn btn-primary"
                    onClick={() => setShowDonate(!showDonate)}
                  >
                    Fechar
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
        <Route
          path="/donate"
          render={() => <EventDetails event={event} component={"Event.js"} />}
        />
      </div>
    </Router>
  );
};

export default Event;
