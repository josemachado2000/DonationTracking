import { useState, useEffect } from "react";
import axios from "axios";

import SolInst from "./SolInst";

const SolInsts = () => {
  const [solInsts, setSolInsts] = useState([]);

  useEffect(() => {
    const getSolInsts = async () => {
      const solInsts = await fetchSolInsts();
      setSolInsts(solInsts);
    };
    getSolInsts();
  }, []);

  const fetchSolInsts = async () => {
    const response = await axios.get("http://localhost:8080/get_all_SOLINSTS");
    return response.data;
  };

  return (
    <>
      <div className="eventsList">
        <h3 style={{ paddingTop: "20px", paddingLeft: "20px" }}>
          Solidarity Institutions
        </h3>
        {solInsts.map((solInst) => (
          <SolInst key={solInst.id} solInst={solInst} />
        ))}
      </div>
    </>
  );
};

export default SolInsts;
