import { useState, useEffect, React } from "react";

import "./Invoices.css";

import Invoice from "./Invoice";
import axios from "axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [supplco] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  useEffect(() => {
    const getInvoices = async () => {
      const invoices = await fetchInvoices();
      setInvoices(invoices);
    };
    getInvoices();
  }, []);

  const fetchInvoices = async () => {
    //const benefId = { benefId: benef.id };
    const supplcoId = { supplcoId: supplco.id };
    const response = await axios.post(
      "http://localhost:8080/get_INVOICES_by_SUPPLCO",
      supplcoId
    );
    return response.data;
  };

  return (
    <>
      <div className="invoicesList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Invoices</h3>
        {invoices.map((invoice) => (
          <Invoice key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </>
  );
};

export default Invoices;
