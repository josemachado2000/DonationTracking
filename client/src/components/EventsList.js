import { useState, useEffect, React } from "react";
import Event from "./Event";

const EventsList = () => {
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

  console.log(events);
  return (
    <div style={{ width: "800px", margin: "auto", marginTop: "200px" }}>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
