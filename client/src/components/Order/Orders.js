import { useState, useEffect } from "react";

import "./Benefits.css";

import Order from "../SupplCo/Order";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const invoices = await fetchOrders();
      setOrders(invoices);
    };
    getOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:8080/get_all_ORDERS");
    return response.data;
  };

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
