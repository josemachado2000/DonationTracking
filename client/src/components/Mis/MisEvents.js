import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "./Mis.css";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MisEvent from "./MisEvent";
import AddEvent from "./AddEvent";

const MisEvents = () => {
  const [events, setEvents] = useState([]);
  const [mis] = useState(JSON.parse(localStorage.getItem("loggedUser")));

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

  const filteredEvents = (events) => {
    var eventsIds = [];
    events.forEach((e) => {
      eventsIds.push(e.oldId);
    });

    events = events.filter(function (item) {
      return !eventsIds.includes(item.id);
    });

    return events;
  };

  const addEvent = async (event) => {
    console.log(event);
    const newEvent = {
      id: uuidv4(),
      oldId: uuidv4(),
      name: event.name,
      description: event.description,
      targetReason: event.targetReason,
      targetAmount: event.targetAmount,
      currentAmount: 0,
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
      isEnabled: 1,
      misId: mis.id,
      solInstId: mis.solInstId,
      benefId: event.benefId,
      supplCoId: event.supplCoId,
    };

    try {
      await axios.post("http://localhost:8080/create_EVENT", newEvent);

      setEvents([...events, newEvent]);
    } catch (e) {
      console.log(e);
    }
  };

  const onDisableEvent = async (newEvent) => {
    try {
      await axios.post("http://localhost:8080/create_EVENT", newEvent);

      setEvents([...events, newEvent]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Router>
      <div className="eventsList">
        <Link to="/mis/events/addEvent" className="addEvent">
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="lg"
            style={{ color: "gray" }}
          />{" "}
          Add Event
        </Link>

        <h3 className="events_title">Events</h3>

        {filteredEvents(events).length === 0 ? (
          <h6>Este Mis nao tem eventos</h6>
        ) : (
          filteredEvents(events).map((event) =>
            event.isEnabled === 1 ? (
              <MisEvent
                key={event.id}
                event={event}
                onDisableEvent={onDisableEvent}
              />
            ) : (
              ""
            )
          )
        )}
      </div>
      <Route
        path="/mis/events/addEvent"
        render={() => <AddEvent onAddEvent={addEvent} />}
      />
    </Router>
  );
};

export default MisEvents;
