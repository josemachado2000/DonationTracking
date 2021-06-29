import { useState, useEffect, React } from "react";
import axios from "axios";

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
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h6>{event.name}</h6>
        </div>
      ))}
    </div>
  );
};

export default SolInstEvents;
