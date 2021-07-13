import { useState, useEffect, React } from "react";

import "./Invoices.css";

import Order from "./Order";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [supplCo] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
    };
    getOrders();
  }, []);

  const fetchOrders = async () => {
    const supplCoId = { supplCoId: supplCo.id };
    const response = await axios.post(
      "http://localhost:8080/get_ORDERS_by_SUPPLCO",
      supplCoId
    );
    console.log(response.data);
    return response.data;
  };
  console.log(orders);
  return (
    <>
      <div className="ordersList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Orders</h3>
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default Orders;
