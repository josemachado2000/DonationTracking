import { useState, React } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Mis.css";
import Card from "react-bootstrap/Card";

import EventDetails from "../Events/EventDetails";

const MisEvent = ({ event }) => {
  const [showMisEvent, setMistEvent] = useState(false);

  return (
    <div className="mis-events">
      <Card>
        <Card.Header className="cardTitle">
          {event.name}
          {showMisEvent === false ? (
            <div className="cardButton">
              <Link
                to="/mis/events/event"
                className="btn btn-primary"
                onClick={() => setMistEvent(!showMisEvent)}
              >
                Mostrar
              </Link>
            </div>
          ) : (
            <div className="cardButton">
              <Link
                to="/mis/events"
                className="btn btn-primary"
                onClick={() => setMistEvent(!showMisEvent)}
              >
                Fechar
              </Link>
            </div>
          )}
        </Card.Header>
        {showMisEvent ? (
          <Route
            path="/mis/events/event"
            render={() => <EventDetails event={event} />}
          />
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default MisEvent;
