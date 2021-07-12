import { BrowserRouter as Router } from "react-router-dom";

import Card from "react-bootstrap/Card";

const Order = ({ order }) => {
  return (
    <Router>
      <div className="supplco_invoiceDetails">
        <div className="invoice">
          <Card>
            <Card.Header className="cardTitle">{order.description}</Card.Header>
            <Card.Body>
              <Card.Text>{order.quantity}</Card.Text>
              <Card.Text>{order.date}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Router>
  );
};

export default Order;
