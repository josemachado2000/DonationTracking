import { BrowserRouter as Router } from "react-router-dom";

import Card from "react-bootstrap/Card";

const Benefit = ({ benefit }) => {
  return (
    <Router>
      <div className="benefit_benefitDetails">
        <div className="benefit">
          <Card>
            <Card.Header className="cardTitle">{benefit.date}</Card.Header>
            <Card.Body>
              <Card.Text>{benefit.description}</Card.Text>
              <Card.Text>{benefit.value}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Router>
  );
};

export default Benefit;
