import { BrowserRouter as Router } from "react-router-dom";

import Card from "react-bootstrap/Card";

const Invoice = ({ invoice }) => {
  return (
    <Router>
      <div className="supplco_invoiceDetails">
        <div className="invoice">
          <Card>
            <Card.Header className="cardTitle">{invoice.amount}</Card.Header>
            <Card.Body>
              <Card.Text>{invoice.products}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Router>
  );
};

export default Invoice;
