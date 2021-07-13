import { useState, useEffect, React } from "react";

import "./Benefits.css";

import Benefit from "./Benefit";
import axios from "axios";

const Benefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [benef] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  useEffect(() => {
    const getBenefits = async () => {
      const benefits = await fetchBenefits();
      setBenefits(benefits);
    };
    getBenefits();
  }, []);

  const fetchBenefits = async () => {
    const benefId = { benefId: benef.id };
    const response = await axios.post(
      "http://localhost:8080/get_BENEFITS_by_BENEF",
      benefId
    );
    return response.data;
  };

  return (
    <>
      <div className="benefitsList">
        <h3 className="benefitsTitle">Benefits</h3>
        {benefits.map((benefit) => (
          <Benefit key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </>
  );
};

export default Benefits;
