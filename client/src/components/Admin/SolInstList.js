import ListGroup from "react-bootstrap/ListGroup";
import { faEnvelopeSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SolInstList = ({ solInsts }) => {
  return (
    <>
      <ListGroup as="ul">
        {solInsts.length === 0
          ? "There are no Solidarity Institutions"
          : solInsts.map((solInst) => (
              <ListGroup.Item as="li" key={solInst.id}>
                <h4 style={{ fontWeight: "bold" }}>{solInst.name}</h4>
                <h5>
                  <FontAwesomeIcon
                    icon={faEnvelopeSquare}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  {" " + solInst.email}
                </h5>
                <h5>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="md"
                    style={{ color: "gray" }}
                  />
                  {" " + solInst.contact}
                </h5>
              </ListGroup.Item>
            ))}
      </ListGroup>
    </>
  );
};

export default SolInstList;
