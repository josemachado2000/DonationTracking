import { useState, useEffect } from "react";
import axios from "axios";

import SolInstEvent from "./SolInstEvent";

const SolInstEvents = ({ solInst }) => {
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
    const solInstId = { solInstId: solInst.id };
    const response = await axios.post(
      "http://localhost:8080/get_EVENTS_by_SOLINST",
      solInstId
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

  return (
    <>
      {filterEvents(events, events1).map((event) => (
        <SolInstEvent
          key={event.id}
          event={event}
          component={"SolInstEvents.js"}
        />
      ))}
    </>
  );
};

export default SolInstEvents;
