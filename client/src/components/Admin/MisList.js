import { useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const MisList = ({ mis, solInsts, onDisableMis, onEnableMis }) => {
  const disableMis = (mis) => {
    const newMis = {
      oldId: mis.id,
      username: mis.username,
      password: mis.password,
      name: mis.name,
      email: mis.email,
      address: mis.address,
      contact: mis.contact,
      isEnabled: 0,
      solInstId: mis.solInstId,
    };

    onDisableMis(newMis);
  };

  const enableMis = (mis) => {
    const newMis = {
      oldId: mis.id,
      username: mis.username,
      password: mis.password,
      name: mis.name,
      email: mis.email,
      address: mis.address,
      contact: mis.contact,
      isEnabled: 1,
      solInstId: mis.solInstId,
    };

    onEnableMis(newMis);
  };

  return (
    <>
      <ListGroup as="ul">
        {mis.length === 0
          ? "No"
          : mis.map((mis) =>
              mis.isEnabled === 1 ? (
                <>
                  <ListGroup.Item as="li" key={mis.id}>
                    Name: {mis.name} <br />
                    Solidarity Institution:
                    {solInsts.map((inst) =>
                      inst.id === mis.solInstId ? " " + inst.name : ""
                    )}
                  </ListGroup.Item>
                  <Button variant="primary" onClick={() => disableMis(mis)}>
                    Disable
                  </Button>
                </>
              ) : (
                <>
                  <ListGroup.Item as="li" key={mis.id} disabled>
                    Name: {mis.name} <br />
                    Solidarity Institution:
                    {solInsts.map((inst) =>
                      inst.id === mis.solInstId ? " " + inst.name : ""
                    )}
                  </ListGroup.Item>
                  <Button variant="primary" onClick={() => enableMis(mis)}>
                    Enable
                  </Button>
                </>
              )
            )}
      </ListGroup>
    </>
  );
};

export default MisList;
