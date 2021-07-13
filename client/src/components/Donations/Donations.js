import { useState, useEffect } from "react";
import axios from "axios";

import "./Donations.css";

import Donation from "./Donation";

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
    const response = await axios.post(
      "http://localhost:8080/get_DONATIONS_by_DONOR",
      donorId
    );
    return response.data;
  };

  return (
    <>
      <h3 className="donationsTitle">My Donations</h3>
      {donations.length === 0 ? (
        <h6 style={{ marginLeft: "40px", marginTop: "20px" }}>
          There are no donations
        </h6>
      ) : (
        donations.map((donation) => <Donation donation={donation} />)
      )}
    </>
  );
};

export default Donations;
