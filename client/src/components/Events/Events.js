import { useState, useEffect } from "react";

import "./Events.css";

import Event from "./Event";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      setEvents(events);
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:8080/get_all_EVENTS");
    return response.data;
  };

  return (
    <>
      <div className="eventsList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Events</h3>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

export default Events;
