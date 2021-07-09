import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./Mis.css";

import MisEvent from "./MisEvent";
import AddEvent from "./AddEvent";

const MisEvents = ({ mis }) => {
  const [events, setEvents] = useState([]);
  const [events1, setEvents1] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      setEvents(events);
    };
    getEvents();

    const getEvents1 = async () => {
      const events = await fetchEvents();
      setEvents1(events);
    };
    getEvents1();
  }, []);

  const fetchEvents = async () => {
    // const misId = { misId: mis.id };
    const misId = { misId: "1a755c26-5266-496a-a8c6-59d2857e84e7" };

    const response = await axios.post(
      "http://localhost:8080/get_EVENTS_by_MIS",
      misId
    );

    return response.data;
  };

  const filterEvents = (array1, array2) => {
    //console.log(array1);
    //console.log(array2);
    for (var ar1 of array1) {
      for (var ar2 of array2) {
        //console.log(ar1.oldId + "           " + ar2.id);
        if (ar1.oldId === ar2.id) {
          //console.log("Corta: " + ar2.id);
          array2.splice(array2.indexOf(ar2), 1);
          break;
        }
      }
    }
    //console.log(array2);
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
      misId: "1a755c26-5266-496a-a8c6-59d2857e84e7",
      solInstId: "479faaff-b3e0-4029-b58d-26d54fa72b59",
    };

    const response = await axios.post(
      "http://localhost:8080/create_EVENT",
      newEvent
    );

    if (response.status === 200) {
      setEvents1([...events1, newEvent]);
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
        {filterEvents(events, events1).length === 0 ? (
          <h6>Este Mis nao tem eventos</h6>
        ) : (
          filterEvents(events, events1).map((event) => (
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
