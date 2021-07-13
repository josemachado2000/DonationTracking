import { useState, useEffect } from "react";
import axios from "axios";

import SolInstEvent from "./SolInstEvent";

const SolInstEvents = ({ solInst }) => {
  const [events, setEvents] = useState([]);
  const [today] = useState(new Date());

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

  const onDonate = async (newDonation, newEventDonate) => {
    try {
      await axios.post("http://localhost:8080/create_DONATION", newDonation);
      await axios.post("http://localhost:8080/create_EVENT", newEventDonate);
      setEvents([...events, newEventDonate]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {filteredEvents(events).map((event) =>
        event.isEnabled === 1 ? (
          new Date(event.endDate).getTime() < today.getTime() ? (
            ""
          ) : (
            <SolInstEvent
              key={event.id}
              event={event}
              component={"SolInstEvents.js"}
              onDonate={onDonate}
            />
          )
        ) : (
          ""
        )
      )}
    </>
  );
};

export default SolInstEvents;
