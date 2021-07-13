import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Benefit = ({ benefit }) => {
  const [event, setEvent] = useState([]);

  // useEffect(() => {
  //   const getEventById = async () => {
  //     const event = await fetchEventById();
  //     setEvent(event);
  //   };
  //   getEventById();
  // }, []);

  // const fetchEventById = async () => {
  //   const eventId = { eventId: benefit.eventId };
  //   const response = await axios.post(
  //     "http://localhost:8080/get_EVENT_by_Id",
  //     eventId
  //   );
  //   return response.data;
  // };
  return (
    <Router>
      <div className="benefit_benefitDetails">
        <div className="benefit">
          <ListGroup.Item as="li" key={benefit.id}>
            <h4 style={{ fontWeight: "bold" }}>{benefit.date}</h4>
            <h5>{benefit.description}</h5>
            <h5>
              <FontAwesomeIcon
                icon={faCoins}
                size="md"
                style={{ color: "gray" }}
              />{" "}
              {benefit.value}€
            </h5>
          </ListGroup.Item>
        </div>
      </div>
    </Router>
  );
};

export default Benefit;
