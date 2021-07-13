import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Invoice = ({ invoice, component, onPayInvoice }) => {
  const payInvoice = (invoice) => {
    onPayInvoice(invoice);
  };

  return (
    <div className="supplco_invoiceDetails">
      <div className="invoice">
        <Card>
          <Card.Header className="cardTitle">{invoice.amount}</Card.Header>
          <Card.Body>
            <Card.Text>{invoice.description}</Card.Text>
            <Card.Text>{invoice.date}</Card.Text>
            <Card.Text>{invoice.isPaid === 1 ? "PAID" : "FOR PAY"}</Card.Text>
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
