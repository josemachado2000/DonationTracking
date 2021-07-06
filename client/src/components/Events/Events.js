import { useState, useEffect } from "react";
import axios from "axios";

import "./Events.css";
import Alert from "react-bootstrap/Alert";

import Event from "./Event";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const onDonateSuccess = (showAlert) => {
    console.log(showAlert);
    setDonationSuccess(showAlert);
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

  return (
    <>
      {donationSuccess ? (
        <Alert variant={"success"}>Thanks for your donation!</Alert>
      ) : (
        ""
      )}
      <div className="eventsList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Events</h3>
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            onDonateSuccess={onDonateSuccess}
          />
        ))}
      </div>
    </>
  );
};

export default Events;
