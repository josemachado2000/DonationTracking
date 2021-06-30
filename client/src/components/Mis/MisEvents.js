import { useState, useEffect, React } from "react";
import axios from "axios";

import MisEvent from "./MisEvent";


const MisEvents = ({ mis }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      setEvents(events);
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    const misId = { misId: mis.id };
    const response = await axios.post(
      "http://localhost:8080/get_EVENTS_by_MIS",
      misId
    );
    return response.data;
  };

  return (
    <>
      {events.map((event) => (
        <MisEvent
          key={event.id}
          event={event}
          component={"MisEvents.js"}
        />
      ))}
    </>
  );
};

export default MisEvents;
