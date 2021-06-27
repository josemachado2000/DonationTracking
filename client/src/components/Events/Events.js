import { useState, useEffect, React } from "react";

import "./Events.css";

import NavBar from "../NavBar/NavBar";
import Event from "./Event";

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
    const response = await fetch("http://localhost:8080/get_all_EVENTS");
    const data = await response.json();
    return data;
  };

  return (
    <>
      <NavBar />
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
