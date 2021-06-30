import { useState, useEffect, React } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import SolInstEvent from "./SolInstEvent";

const SolInstEvents = ({ solInst }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      setEvents(events);
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    const solInstId = { solInstId: solInst.id };
    const response = await axios.post(
      "http://localhost:8080/get_EVENTS_by_SOLINST",
      solInstId
    );
    return response.data;
  };

  return (
    <>
      {events.map((event) => (
        <SolInstEvent
          key={event.id}
          event={event}
          component={"SolInstEvents.js"}
        />
      ))}
    </>
  );
};

export default SolInstEvents;
