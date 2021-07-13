import { useState, useEffect } from "react";
import axios from "axios";

import "./Events.css";
import Alert from "react-bootstrap/Alert";

import Event from "./Event";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [today] = useState(new Date());

  const onDonateSuccess = (showAlert) => {
    setDonationSuccess(showAlert);
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

  const filteredEvents = (events) => {
    var eventsIds = [];
    events.forEach((e) => {
      eventsIds.push(e.oldId);
    });

    events = events.filter(function (item) {
      console.log(item.id);
      return !eventsIds.includes(item.id);
    });

    return events;
  };

  return (
    <>
      {donationSuccess ? (
        <Alert variant={"success"}>Thanks for your donation!</Alert>
      ) : (
        ""
      )}
      <div className="eventsList">
        <h3 className="eventsTitle">Events</h3>
        {filteredEvents(events).map((event) =>
          event.isEnabled === 1 ? (
            new Date(event.endDate).getTime() < today.getTime() ? (
              ""
            ) : (
              <Event
                key={event.id}
                event={event}
                onDonateSuccess={onDonateSuccess}
                onDonate={onDonate}
              />
            )
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
};

export default Events;
