import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProfileDetails = ({user}) => {

  return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={user.username} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={user.password} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={user.name} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Institution
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={user.institution} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Address
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={user.address} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={user.email} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Contact
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={user.contact} />
          </Col>
        </Form.Group>
      </Form>
  );
};

export default ProfileDetails;
