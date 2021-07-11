import ListGroup from "react-bootstrap/ListGroup";

const SupplCoList = ({ supplCo }) => {
  return (
    <>
      <ListGroup as="ul">
        {supplCo.length === 0
          ? "NO"
          : supplCo.map((supplCo) => (
              <ListGroup.Item as="li" key={supplCo.id}>
                Name: {supplCo.name} <br />
                Email: {supplCo.email} <br />
                Contact: {supplCo.contact} <br />
              </ListGroup.Item>
            ))}
      </ListGroup>
    </>
  );
};

export default SupplCoList;
