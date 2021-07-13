import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./Invoices.css";

const Invoice = ({ invoice, component, onPayInvoice }) => {
  const payInvoice = (invoice) => {
    onPayInvoice(invoice);
  };

  return (
    <div className="supplco_invoiceDetails">
      <div className="invoice">
        <Card className="invoice-card">
          <Card.Header className="cardTitle">
            <h5>Invoice Date: {invoice.date}</h5>
          </Card.Header>
          <Card.Header className="cardTitle">
            <h5>State: {invoice.isPaid === 1 ? "PAID" : "FOR PAY"}</h5>
          </Card.Header>

          <Card.Body className="invoice-card-body">
            <Card.Text>
              <h5>Description: {invoice.description}</h5>
            </Card.Text>
            <Card.Text>
              <h5>Amount: {invoice.amount}€</h5>
            </Card.Text>
          </Card.Body>

          {component === "MisInvoices.js" ? (
            invoice.isPaid === 1 ? (
              ""
            ) : (
              <Button
                variant="btn btn-dark btn-sm"
                onClick={() => payInvoice(invoice)}
                style={{ float: "right", marginTop: "20px" }}
              >
                Pay
              </Button>
            )
          ) : (
            ""
          )}
        </Card>
      </div>
    </div>
  );
};

export default Invoice;
