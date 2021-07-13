import { useState, React } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Mis.css";
import Card from "react-bootstrap/Card";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EventDetails from "../Events/EventDetails";

const MisEvent = ({ event, onDisableEvent }) => {
  const [showMisEvent, setMistEvent] = useState(false);

  return (
    <Router>
      <div className="mis-events">
        <Card className="mis-event-card">
          <Card.Header className="cardTitle">
            {event.name}
            {showMisEvent === false ? (
              <div className="cardButton">
                <Link
                  to="/mis/events/event"
                  onClick={() => setMistEvent(!showMisEvent)}
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="lg"
                    style={{ marginLeft: "10px", color: "black" }}
                  />
                </Link>
              </div>
            ) : (
              <div className="cardButton">
                <Link
                  to="/mis/events"
                  onClick={() => setMistEvent(!showMisEvent)}
                >
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    size="lg"
                    style={{ marginLeft: "10px", color: "black" }}
                  />
                </Link>
              </div>
            )}
          </Card.Header>
          {showMisEvent ? (
            <Route
              path="/mis/events/event"
              render={() => (
                <EventDetails
                  event={event}
                  component={"MisEvents.js"}
                  onDisableEvent={onDisableEvent}
                />
              )}
            />
          ) : (
            ""
          )}
        </Card>
      </div>
    </Router>
  );
};

export default MisEvent;
