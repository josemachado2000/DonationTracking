import ListGroup from "react-bootstrap/ListGroup";
import {
  faEnvelopeSquare,
  faHandHoldingHeart,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MisList = ({ mis, solInsts }) => {
  return (
    <>
      <ListGroup as="ul">
        {mis.length === 0
          ? "There are no Members of Solidarity Institution"
          : mis.map((mis) => (
              <ListGroup.Item as="li" key={mis.id}>
                <h4 style={{ fontWeight: "bold" }}>{mis.name}</h4>
                {solInsts.map((inst) =>
                  inst.id === mis.solInstId ? (
                    <h5>
                      <FontAwesomeIcon
                        icon={faHandHoldingHeart}
                        size="md"
                        style={{ color: "gray" }}
                      />
                      {" " + inst.name}
                    </h5>
                  ) : (
                    ""
                  )
                )}
                <h5>
                  <FontAwesomeIcon
                    icon={faEnvelopeSquare}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  {" " + mis.email}
                </h5>
                <h5>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="md"
                    style={{ color: "gray" }}
                  />
                  {" " + mis.contact}
                </h5>
              </ListGroup.Item>
            ))}
      </ListGroup>
    </>
  );
};

export default MisList;
