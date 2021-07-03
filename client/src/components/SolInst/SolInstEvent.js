import { useState, React } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./SolInst.css";
import Card from "react-bootstrap/Card";

import EventDetails from "../Events/EventDetails";

const SolInstEvent = ({ event }) => {
  const [showSolInstEvent, setShowSolInstEvent] = useState(false);

  return (
    <Router>
      <div className="solInsts-events">
        <Card>
          <Card.Header className="cardTitle">
            {event.name}
            {showSolInstEvent === false ? (
              <div className="cardButton">
                <Link
                  to="/solidarity_institutions/events/event"
                  className="btn btn-primary"
                  onClick={() => setShowSolInstEvent(!showSolInstEvent)}
                >
                  Mostrar
                </Link>
              </div>
            ) : (
              <div className="cardButton">
                <Link
                  to="/solidarity_institutions/events"
                  className="btn btn-primary"
                  onClick={() => setShowSolInstEvent(!showSolInstEvent)}
                >
                  Fechar
                </Link>
              </div>
            )}
          </Card.Header>
          {showSolInstEvent ? (
            <Route
              path="/solidarity_institutions/events/event"
              render={() => <EventDetails event={event} />}
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
