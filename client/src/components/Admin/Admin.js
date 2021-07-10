import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./Admin.css";

import CreateMis from "./CreateMis";
import CreateSolInst from "./CreateSolInst";
import MisList from "./MisList";
import SolInstList from "./SolInstList";

const Admin = () => {
  const [solInsts, setSolInsts] = useState([]);
  const [mis, setMis] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getSolInsts = async () => {
      const solInsts = await fetchSolInsts();
      setSolInsts(solInsts);
    };
    getSolInsts();

    const getMis = async () => {
      const mis = await fetchMis();
      setMis(mis);
    };
    getMis();
  }, []);

  const fetchSolInsts = async () => {
    const response = await axios.get("http://localhost:8080/get_all_SOLINSTS");

    return response.data;
  };

  const fetchMis = async () => {
    const response = await axios.get("http://localhost:8080/get_all_MIS");

    return response.data;
  };

  const createSolInst = async (newSolInst) => {
    const response = await axios.post(
      "http://localhost:8080/create_SOLINST",
      newSolInst
    );

    if (response.status === 200) {
      setSolInsts([...solInsts, newSolInst]);
    }
  };

  const createMis = async (newMis) => {
    const response = await axios.post(
      "http://localhost:8080/create_MIS",
      newMis
    );

    if (response.status === 200) {
      setMis([...mis, newMis]);
    }
  };

  const filterMis = (array1, array2) => {
    for (var ar1 of array1) {
      for (var ar2 of array2) {
        if (ar1.oldId === ar2.id) {
          array2.splice(array2.indexOf(ar2), 1);
          break;
        }
      }
    }

    return array2;
  };

  return (
    <>
      <div className="create_section">
        <CreateSolInst onCreateSolInst={createSolInst} />
        <CreateMis solInsts={solInsts} onCreateMis={createMis} />
      </div>
      <div className="list_section">
        <SolInstList solInsts={solInsts} />
        <MisList
          mis={filterMis(mis, mis)}
          solInsts={solInsts}
          onDisableMis={createMis}
          onEnableMis={createMis}
        />
      </div>
    </>
  );
};

export default Admin;
