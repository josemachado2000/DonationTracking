import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./SolInst.css";
import Card from "react-bootstrap/Card";

import SolInstEvents from "./SolInstEvents";

const SolInst = ({ solInst }) => {
  const [showSolInstEvents, setShowSolInstEvents] = useState(false);

  return (
    <Router>
      <div className="solInsts">
        <Card>
          <Card.Header className="cardTitle">{solInst.id}</Card.Header>
          <Card.Body>
            <Card.Text>{solInst.name}</Card.Text>
            {showSolInstEvents === false ? (
              <div className="cardButton">
                <Link
                  to="/solidarity_institutions/events"
                  className="btn btn-primary"
                  onClick={() => setShowSolInstEvents(!showSolInstEvents)}
                >
                  Events
                </Link>
              </div>
            ) : (
              <div className="cardButton">
                <Link
                  to="/solidarity_institutions"
                  className="btn btn-primary"
                  onClick={() => setShowSolInstEvents(!showSolInstEvents)}
                >
                  Fechar
                </Link>
              </div>
            )}
          </Card.Body>
          <Route
            path="/solidarity_institutions/events"
            render={() => <SolInstEvents solInst={solInst} />}
          />
        </Card>
      </div>
    </Router>
  );
};

export default SolInst;
