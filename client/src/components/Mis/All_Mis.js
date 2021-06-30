import { useState, useEffect, React } from "react";
import axios from "axios";

import Mis from "./Mis";

const AllMis = () => {
  const [allMis, setAllMis] = useState([]);

  useEffect(() => {
    const getAllMis = async () => {
      const AllMis = await fetchAllMis();
      setAllMis(AllMis);
    };
    getAllMis();
  }, []);

  const fetchAllMis = async () => {
    const response = await axios.get("http://localhost:8080/get_all_MIS");
    return response.data;
  };

  return (
    <>
      <div className="eventsList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>
          Member of Institution of Solidarity
        </h3>
        {allMis.map((mis) => (
          <Mis key={mis.id} mis={mis} />
        ))}
      </div>
    </>
  );
};

export default AllMis;
