import { BrowserRouter as Router } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

const Benefit = ({ benefit }) => {
  return (
    <Router>
      <div className="benefit_benefitDetails">
        <div className="benefit">
          <ListGroup.Item as="li" key={benefit.id} style={{ width: "97.5%" }}>
            <h4 style={{ fontWeight: "bold" }}>{benefit.description}</h4>
            <h5>{benefit.date}</h5>
            <br />
            <h5>
              {/* <FontAwesomeIcon
                icon={faCoins}
                size="md"
                style={{ color: "gray" }}
              />{" "} */}
              {benefit.value}
            </h5>
          </ListGroup.Item>
        </div>
      </div>
    </Router>
  );
};

export default Benefit;
