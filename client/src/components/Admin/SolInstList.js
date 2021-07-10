import ListGroup from "react-bootstrap/ListGroup";

const SolInstList = ({ solInsts }) => {
  return (
    <>
      <ListGroup as="ul">
        {solInsts.length === 0
          ? "NO"
          : solInsts.map((solInst) => (
              <ListGroup.Item as="li" key={solInst.id}>
                Name: {solInst.name} <br />
                Email: {solInst.email} <br />
                Contact: {solInst.contact} <br />
              </ListGroup.Item>
            ))}
      </ListGroup>
    </>
  );
};

export default SolInstList;
