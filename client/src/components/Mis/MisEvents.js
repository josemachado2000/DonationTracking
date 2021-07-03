import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import "./Mis.css";

import MisEvent from "./MisEvent";
import AddEvent from "./AddEvent";

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
    // const misId = { misId: mis.id };
    const misId = { misId: "1781190e-2726-4136-aa4d-f9c55b23f4f0" };

    const response = await axios.post(
      "http://localhost:8080/get_EVENTS_by_MIS",
      misId
    );
    return response.data;
  };

  const addEvent = async (event) => {
    const newEvent = {
      name: event.name,
      description: event.description,
      targetReason: event.targetReason,
      targetAmount: event.targetAmount,
      beginDate:
        event.beginDate.getDate() +
        "/" +
        (event.beginDate.getMonth() + 1) +
        "/" +
        event.beginDate.getFullYear(),
      endDate:
        event.endDate.getDate() +
        "/" +
        (event.endDate.getMonth() + 1) +
        "/" +
        event.endDate.getFullYear(),
      misId: "1781190e-2726-4136-aa4d-f9c55b23f4f0",
      solInstId: "f64284d0-419b-48b7-992b-4cce1020b0e5",
    };

    const response = await axios.post(
      "http://localhost:8080/create_EVENT",
      newEvent
    );

    if (response.status === 200) {
      setEvents([...events, newEvent]);
    }
  };

  return (
    <Router>
      <div className="eventsList">
        <div className="events_title_addEvent">
          <h3 className="events_title">Events</h3>
          <Link to="/mis/events/addEvent" className="btn btn-primary addEvent">
            Add Event
          </Link>
        </div>
        {events.length === 0 ? (
          <h6>Este Mis nao tem eventos</h6>
        ) : (
          events.map((event) => <MisEvent key={event.id} event={event} />)
        )}
      </div>
      <Route
        path="/mis/events/addEvent"
        render={() => <AddEvent mis={mis} onAddEvent={addEvent} />}
      />
    </Router>
  );
};

export default MisEvents;
