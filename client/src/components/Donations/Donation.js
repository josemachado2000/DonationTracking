import { useState, useEffect } from "react";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";
import { faDonate, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Donation = ({ donation }) => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const getEventById = async () => {
      const event = await fetchEventById();
      setEvent(event);
    };
    getEventById();
  }, []);

  const fetchEventById = async () => {
    const eventId = { eventId: donation.eventId };
    const response = await axios.post(
      "http://localhost:8080/get_EVENT_by_Id",
      eventId
    );
    return response.data;
  };

  return (
    <div className="donation_div">
      <ListGroup.Item as="li" key={donation.id}>
        {event[0] ? (
          <>
            <h4 style={{ fontWeight: "bold" }}>{event[0].name}</h4>

            <h5>{event[0].description}</h5>

            <h5>{event[0].targetReason}</h5>
          </>
        ) : (
          ""
        )}

        <h5>
          <FontAwesomeIcon
            icon={faDonate}
            size="md"
            style={{ color: "gray" }}
          />{" "}
          {donation.amount}€
        </h5>
        <h5>
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size="md"
            style={{ color: "gray" }}
          />{" "}
          {donation.date}
        </h5>
      </ListGroup.Item>
    </div>
  );
};

export default Donation;
