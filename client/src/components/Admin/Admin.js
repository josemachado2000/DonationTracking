import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./Admin.css";

import CreateMis from "./CreateMis";
import CreateSolInst from "./CreateSolInst";
import MisList from "./MisList";
import SolInstList from "./SolInstList";
import CreateSupplCo from "./CreateSupplCo";
import SupplCoList from "./SupplCoList";

const Admin = () => {
  const [solInsts, setSolInsts] = useState([]);
  const [mis, setMis] = useState([]);
  const [supplCo, setSupplCo] = useState([]);

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

  const createSupplCo = async (newSupplCo) => {
    const response = await axios.post(
      "http://localhost:8080/create_SUPPLCO",
      newSupplCo
    );

    if (response.status === 200) {
      setSupplCo([...supplCo, newSupplCo]);
    }
  };

  const filteredMis = (mis) => {
    var misIds = [];
    mis.forEach((m) => {
      misIds.push(m.oldId);
    });

    mis = mis.filter(function (item) {
      console.log(item.id);
      return !misIds.includes(item.id);
    });

    return mis;
  };

  return (
    <>
      <div className="create_section">
        <CreateSolInst onCreateSolInst={createSolInst} />
        <CreateMis solInsts={solInsts} onCreateMis={createMis} />
        <CreateSupplCo onCreateSupplCo={createSupplCo} />
      </div>
      <div className="list_section">
        <SolInstList solInsts={solInsts} />
        <MisList
          mis={filteredMis(mis)}
          solInsts={solInsts}
          onDisableMis={createMis}
          onEnableMis={createMis}
        />
        <SupplCoList supplCo={supplCo} />
      </div>
    </>
  );
};

export default Admin;
