import ListGroup from "react-bootstrap/ListGroup";
import { faEnvelopeSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SupplCoList = ({ supplCo }) => {
  return (
    <>
      <ListGroup as="ul">
        {supplCo.length === 0
          ? "There are no Supplier Companies"
          : supplCo.map((supplCo) => (
              <ListGroup.Item as="li" key={supplCo.id}>
                <h4 style={{ fontWeight: "bold" }}>{supplCo.name}</h4>
                <h5>
                  <FontAwesomeIcon
                    icon={faEnvelopeSquare}
                    size="lg"
                    style={{ color: "gray" }}
                  />
                  {" " + supplCo.email}
                </h5>
                <h5>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="md"
                    style={{ color: "gray" }}
                  />
                  {" " + supplCo.contact}
                </h5>
              </ListGroup.Item>
            ))}
      </ListGroup>
    </>
  );
};

export default SupplCoList;
