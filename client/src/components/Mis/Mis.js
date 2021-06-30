import { useState, React } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Mis.css";
import Card from "react-bootstrap/Card";

import MisEvents from "./MisEvents";

const Mis = ({ mis }) => {
  const [showMisEvents, setShowMisEvents] = useState(false);

  return (
    <Router>
      <div className="mis">
        <Card>
          <Card.Header className="cardTitle">{mis.id}</Card.Header>
          <Card.Body>
            <Card.Text>{mis.name}</Card.Text>
            {showMisEvents === false ? (
              <div className="cardButton">
                <Link
                  to="/mis/events"
                  className="btn btn-primary"
                  onClick={() => setShowMisEvents(!showMisEvents)}
                >
                  Events
                </Link>
              </div>
            ) : (
              <div className="cardButton">
                <Link
                  to="/mis"
                  className="btn btn-primary"
                  onClick={() => setShowMisEvents(!showMisEvents)}
                >
                  Fechar
                </Link>
              </div>
            )}
          </Card.Body>
          <Route
          path="/mis/events"
          render={() => <MisEvents mis={mis} />}
        />
        </Card>
      </div>  
    </Router>
  );
};

export default Mis;
