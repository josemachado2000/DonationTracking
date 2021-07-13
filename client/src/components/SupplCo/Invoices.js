import { useState, useEffect, React } from "react";

import "./Invoices.css";

import Invoice from "./Invoice";
import axios from "axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [supplCo] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  useEffect(() => {
    const getInvoices = async () => {
      const invoices = await fetchInvoices();
      setInvoices(invoices);
    };
    getInvoices();
  }, []);

  const fetchInvoices = async () => {
    const supplCoId = { supplCoId: supplCo.id };
    const response = await axios.post(
      "http://localhost:8080/get_INVOICES_by_SUPPLCO",
      supplCoId
    );
    return response.data;
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

  return (
    <>
      <div className="invoicesList">
        <h3
          style={{
            paddingTop: "20px",
            paddingLeft: "40px",
            fontWeight: "bold",
          }}
        >
          Invoices
        </h3>
        {filteredInvoices(invoices).length === 0 ? (
          <h6 style={{ marginLeft: "40px", marginTop: "20px" }}>
            There are no invoices
          </h6>
        ) : (
          filteredInvoices(invoices).map((invoice) => (
            <Invoice
              key={invoice.id}
              invoice={invoice}
              component="SupplCo.js"
            />
          ))
        )}
      </div>
    </>
  );
};

export default Invoices;
