import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProfileDetails = ({profile}) => {

  return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={profile.username} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={profile.password} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={profile.name} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Institution
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={profile.institution} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Address
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={profile.address} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={profile.email} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Contact
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={profile.contact} />
          </Col>
        </Form.Group>
      </Form>
  );
};

export default ProfileDetails;
