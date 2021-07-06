import { React, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EventDetails from "./EventDetails";

const Event = ({ event, onDonateSuccess }) => {
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
                  <Link to="/donate" onClick={() => setShowDonate(!showDonate)}>
                    <FontAwesomeIcon
                      icon={faChevronCircleRight}
                      size="lg"
                      style={{ color: "gray" }}
                    />
                  </Link>
                </div>
              ) : (
                <div className="cardButton">
                  <Link to="/" onClick={() => setShowDonate(!showDonate)}>
                    <FontAwesomeIcon
                      icon={faChevronCircleLeft}
                      size="lg"
                      style={{ color: "gray" }}
                    />
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
        <Route
          path="/donate"
          render={() => (
            <EventDetails
              event={event}
              component={"Event.js"}
              onDonateSuccess={onDonateSuccess}
            />
          )}
        />
      </div>
    </Router>
  );
};

export default Event;
