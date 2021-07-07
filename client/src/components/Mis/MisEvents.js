import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./Mis.css";

import MisEvent from "./MisEvent";
import AddEvent from "./AddEvent";

const MisEvents = ({ mis }) => {
  const [events1, setEvents1] = useState([]);
  const [events2, setEvents2] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      setEvents1(events);
      setEvents2(events);
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    // const misId = { misId: mis.id };
    const misId = { misId: "462109f7-d76e-46bf-9bed-7e0e67a0f774" };

    const response = await axios.post(
      "http://localhost:8080/get_EVENTS_by_MIS",
      misId
    );
    return response.data;
  };

  const filterEvents = (array1, array2) => {
    for (var ar1 of array1) {
      for (var ar2 of array2) {
        if (ar1.oldId === ar2.id) {
          array2.splice(array2.indexOf(ar2), 1);
        }
      }
    }
    return array2;
  };

  const addEvent = async (event) => {
    const newEvent = {
      oldId: uuidv4(),
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
      misId: "462109f7-d76e-46bf-9bed-7e0e67a0f774",
      solInstId: "84cba60a-1067-476f-a8b5-40507596dde0",
    };

    const response = await axios.post(
      "http://localhost:8080/create_EVENT",
      newEvent
    );

    if (response.status === 200) {
      setEvents1([...events1, newEvent]);
      setEvents2([...events2, newEvent]);
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
        {filterEvents(events1, events2).length === 0 ? (
          <h6>Este Mis nao tem eventos</h6>
        ) : (
          filterEvents(events1, events2).map((event) => (
            <MisEvent key={event.id} event={event} />
          ))
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
