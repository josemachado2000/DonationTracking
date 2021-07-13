import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Order = ({ order }) => {
  const [event, setEvent] = useState([]);
  const [mis, setMis] = useState([]);
  const [solInst, setSolInst] = useState([]);
  const [orderInvoice, setOrderInvoice] = useState([]);

  const [show, setShow] = useState(false);
  let history = useHistory();

  //Invoice Modal
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(Date());

  useEffect(() => {
    const getData = async () => {
      await fetchData();
    };
    getData();
  }, []);

  const fetchData = async () => {
    const eventId = { eventId: order.eventId };
    const event = await axios.post(
      "http://localhost:8080/get_EVENT_by_Id",
      eventId
    );
    setEvent(event.data);

    const misId = { misId: order.misId };
    const mis = await axios.post("http://localhost:8080/get_MIS_by_Id", misId);
    setMis(mis.data);

    const solInstId = { solInstId: mis.data[0].solInstId };
    const solInst = await axios.post(
      "http://localhost:8080/get_SOLINST_by_Id",
      solInstId
    );
    setSolInst(solInst.data);

    const orderId = { orderId: order.id };
    const orderInvoice = await axios.post(
      "http://localhost:8080/get_INVOICE_by_ORDER",
      orderId
    );
    if (orderInvoice.data.length === 0) {
      setOrderInvoice("0");
    } else {
      setOrderInvoice(orderInvoice.data);
    }
  };

  const handleClose = () => {
    setShow(false);
    setAmount("");
    setDate(new Date());
  };
  const handleShow = () => setShow(true);

  const createInvoice = async (order) => {
    if (!amount || !date) {
      alert("Empty fields!");
      return;
    }

    const newInvoice = {
      id: uuidv4(),
      oldId: uuidv4(),
      description: order.description,
      amount: amount,
      date:
        new Date(date).getDate() +
        "/" +
        (new Date(date).getMonth() + 1) +
        "/" +
        new Date(date).getFullYear(),
      isPaid: 0,
      misId: order.misId,
      supplCoId: order.supplCoId,
      eventId: order.eventId,
      orderId: order.id,
    };
    try {
      await axios.post("http://localhost:8080/create_INVOICE", newInvoice);
      handleClose();
      history.push("/supplco/orders");
      history.go(0);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="supplco_invoiceDetails">
      <div className="invoice">
        <Card>
          {event[0] ? (
            <Card.Header className="cardTitle">{event[0].name}</Card.Header>
          ) : (
            ""
          )}
          {mis[0] ? (
            <Card.Header className="cardTitle">{mis[0].name}</Card.Header>
          ) : (
            ""
          )}
          {solInst[0] ? (
            <Card.Header className="cardTitle">{solInst[0].name}</Card.Header>
          ) : (
            ""
          )}
          <Card.Body>
            <Card.Text>{order.description}</Card.Text>
            <Card.Text>{order.date}</Card.Text>
          </Card.Body>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{event.name} - Invoice</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group as={Row} style={{ marginTop: "10px" }}>
                  <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                    Order Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      as="textarea"
                      readOnly
                      value={order.description}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginTop: "10px" }}>
                  <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                    Order Date
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" readOnly value={order.date} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginTop: "10px" }}>
                  <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                    Invoice Amount
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginTop: "10px" }}>
                  <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                    Invoice Date
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" readOnly value={date} />
                  </Col>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary" onClick={() => createInvoice(order)}>
                Create Invoice
              </Button>
            </Modal.Footer>
          </Modal>

          {orderInvoice === "0" ? (
            <Button
              variant="btn btn-dark btn-sm"
              onClick={() => handleShow()}
              style={{ float: "right", marginTop: "20px" }}
            >
              Create Invoice
            </Button>
          ) : (
            ""
          )}
        </Card>
      </div>
    </div>
  );
};

export default Order;
