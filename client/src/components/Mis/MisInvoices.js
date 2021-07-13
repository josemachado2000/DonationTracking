import { useState, useEffect, React } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Invoice from "../SupplCo/Invoice";

const MisInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [mis] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  useEffect(() => {
    const getInvoices = async () => {
      const invoices = await fetchInvoices();
      setInvoices(invoices);
    };
    getInvoices();
  }, []);

  const fetchInvoices = async () => {
    const misId = { misId: mis.id };
    const response = await axios.post(
      "http://localhost:8080/get_INVOICES_by_MIS",
      misId
    );
    return response.data;
  };

  const fetchEvent = async (invoice) => {
    const eventId = { eventId: invoice.eventId };
    const response = await axios.post(
      "http://localhost:8080/get_EVENT_by_Id",
      eventId
    );

    return response.data[0];
  };

  const filteredInvoices = (invoices) => {
    var invoicesIds = [];
    invoices.forEach((i) => {
      invoicesIds.push(i.oldId);
    });

    invoices = invoices.filter(function (item) {
      return !invoicesIds.includes(item.id);
    });

    return invoices;
  };

  const onPayInvoice = async (invoice) => {
    const newInvoice = {
      id: uuidv4(),
      oldId: invoice.id,
      description: invoice.description,
      amount: invoice.amount,
      date: invoice.date,
      isPaid: 1,
      misId: invoice.misId,
      supplCoId: invoice.supplCoId,
      eventId: invoice.eventId,
    };

    const event = await fetchEvent(invoice);

    const newBenefit = {
      id: uuidv4(),
      date:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear(),
      description: `Benefit from "${event.name}" event`,
      value: invoice.description,
      dataType: {
        type: "BENEFIT",
        subType: "BENEFIT",
      },
      benefId: event.benefId,
    };

    try {
      await axios.post("http://localhost:8080/create_INVOICE", newInvoice);
      await axios.post("http://localhost:8080/create_BENEFIT", newBenefit);
      setInvoices([...invoices, newInvoice]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="ordersList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Invoices</h3>
        {filteredInvoices(invoices).map((invoice) => (
          <Invoice
            key={invoice.id}
            invoice={invoice}
            component="MisInvoices.js"
            onPayInvoice={onPayInvoice}
          />
        ))}
      </div>
    </>
  );
};

export default MisInvoices;
