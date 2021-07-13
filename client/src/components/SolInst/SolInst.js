import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./SolInst.css";
import Card from "react-bootstrap/Card";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SolInstEvents from "./SolInstEvents";

const SolInst = ({ solInst }) => {
  const [showSolInstEvents, setShowSolInstEvents] = useState(false);

  return (
    <Router>
      <div className="solInsts">
        <Card className="solInst-card">
          <Card.Header className="cardTitle">{solInst.name}</Card.Header>
          <Card.Body>
            {showSolInstEvents === false ? (
              <div className="cardButton">
                <Link
                  to="/solidarity_institutions/events"
                  className="btn btn-dark btn-sm"
                  onClick={() => setShowSolInstEvents(!showSolInstEvents)}
                >
                  Events
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="lg"
                    style={{ marginLeft: "10px" }}
                  />
                </Link>
              </div>
            ) : (
              <div className="cardButton">
                <Link
                  to="/solidarity_institutions"
                  className="btn btn-dark btn-sm"
                  onClick={() => setShowSolInstEvents(!showSolInstEvents)}
                >
                  Fechar
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    size="lg"
                    style={{ marginLeft: "10px" }}
                  />
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
