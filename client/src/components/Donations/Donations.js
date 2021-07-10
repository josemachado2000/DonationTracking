import { useState, useEffect } from "react";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";

const Donations = () => {
  const [donor] = useState(JSON.parse(localStorage.getItem("loggedUser")));
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const getDonations = async () => {
      const donations = await fetchDonations();
      setDonations(donations);
    };
    getDonations();
  }, []);

  const fetchDonations = async () => {
    const donorId = { donorId: donor.id };
    const response = await axios.get(
      "http://localhost:8080/get_DONATIONS_by_DONOR",
      donorId
    );
    return response.data;
  };

  return (
    <>
      <h3>My Donations</h3>
      {donations.map((donation) => (
        <ListGroup.Item as="li" key={donation.id}>
          {donation.id} <br />
          {donation.amount}€<br />
          {donation.date} <br />
        </ListGroup.Item>
      ))}
    </>
  );
};

export default Donations;
