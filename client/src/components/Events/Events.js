import { useState, useEffect } from "react";
import axios from "axios";

import "./Events.css";
import Alert from "react-bootstrap/Alert";

import Event from "./Event";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [events1, setEvents1] = useState([]);
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

    const getEvents1 = async () => {
      const events = await fetchEvents();
      setEvents1(events);
    };
    getEvents1();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:8080/get_all_EVENTS");
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

  return (
    <>
      {donationSuccess ? (
        <Alert variant={"success"}>Thanks for your donation!</Alert>
      ) : (
        ""
      )}
      <div className="eventsList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Events</h3>
        {filterEvents(events, events1).map((event) => (
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
