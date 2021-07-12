import { useState, useEffect, React } from "react";

import "./Invoices.css";

import Order from "./Order";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [supplco] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  useEffect(() => {
    const getOrders = async () => {
      const invoices = await fetchOrders();
      setOrders(invoices);
    };
    getOrders();
  }, []);

  const fetchOrders = async () => {
    //const benefId = { benefId: benef.id };
    const supplcoId = { supplcoId: supplco.id };
    const response = await axios.post(
      "http://localhost:8080/get_ORDERS_by_SUPPLCO",
      supplcoId
    );
    return response.data;
  };

  return (
    <>
      <div className="ordersList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Invoices</h3>
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default Orders;
