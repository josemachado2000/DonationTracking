import { useState, useEffect } from "react";

import "./Benefits.css";

import Invoice from "../SupplCo/Invoice";
import axios from "axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      const invoices = await fetchInvoices();
      setInvoices(invoices);
    };
    getInvoices();
  }, []);

  const fetchInvoices = async () => {
    const response = await axios.get("http://localhost:8080/get_all_INVOICES");
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
