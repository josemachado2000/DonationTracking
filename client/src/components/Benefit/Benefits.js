import { useState, useEffect } from "react";

import "./Benefits.css";

import Benefit from "../Benef/Benefit";
import axios from "axios";

const Benefits = () => {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const getBenefits = async () => {
      const benefits = await fetchBenefits();
      setBenefits(benefits);
    };
    getBenefits();
  }, []);

  const fetchBenefits = async () => {
    const response = await axios.get("http://localhost:8080/get_all_BENEFITS");
    return response.data;
  };

  return (
    <>
      <div className="benefitsList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Benefits</h3>
        {benefits.map((benefit) => (
          <Benefit key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </>
  );
};

export default Benefits;
