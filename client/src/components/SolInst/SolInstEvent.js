import { useState, React } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./SolInst.css";
import Card from "react-bootstrap/Card";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EventDetails from "../Events/EventDetails";

const SolInstEvent = ({ event, onDonate }) => {
  const [showSolInstEvent, setShowSolInstEvent] = useState(false);

  return (
    <Router>
      <div className="solInsts-events">
        <Card className="solInst-event-card">
          <Card.Header className="solInst-event-card-title">
            {event.name}
            {showSolInstEvent === false ? (
              <div className="cardButton">
                <Link
                  to="/solidarity_institutions/events/event"
                  onClick={() => setShowSolInstEvent(!showSolInstEvent)}
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
                  to="/solidarity_institutions/events"
                  onClick={() => setShowSolInstEvent(!showSolInstEvent)}
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
          {showSolInstEvent ? (
            <Route
              path="/solidarity_institutions/events/event"
              render={() => <EventDetails event={event} onDonate={onDonate} />}
            />
          ) : (
            ""
          )}
        </Card>
      </div>
    </Router>
  );
};

export default SolInstEvent;
