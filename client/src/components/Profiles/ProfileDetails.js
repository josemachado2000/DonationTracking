import { useState } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ProfileDetails = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact);

  const [allowEdit, setAllowEdit] = useState(true);

  const onSaveClick = async () => {
    //   if (
    //     !name ||
    //     !description ||
    //     !targetReason ||
    //     !targetAmount ||
    //     !event.beginDate ||
    //     !endDate
    //   ) {
    //     alert("Empty fields!");
    //     return;
    //   }
    //   const newProfile = {
    //     oldId: event.id,
    //     name: name,
    //     description: description,
    //     targetReason: targetReason,
    //     targetAmount: targetAmount,
    //     currentAmount: event.currentAmount,
    //     beginDate: event.beginDate,
    //     endDate:
    //       new Date(endDate).getDate() +
    //       "/" +
    //       (new Date(endDate).getMonth() + 1) +
    //       "/" +
    //       new Date(endDate).getFullYear(),
    //     misId: "1a755c26-5266-496a-a8c6-59d2857e84e7",
    //     solInstId: "479faaff-b3e0-4029-b58d-26d54fa72b59",
    //   };
    //   try {
    //     await axios.post("http://localhost:8080/create_EVENT", newEvent);
    //   } catch (e) {
    //     console.log(e);
    //   }
  };

  return (
    <>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control
              readOnly={allowEdit}
              value={username}
              onClick={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              readOnly={allowEdit}
              value={password}
              onClick={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              readOnly={allowEdit}
              value={name}
              onClick={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Institution
          </Form.Label>
          <Col sm="10">
            <Form.Control
              readOnly={allowEdit}
              value={user.institution}
              onClick={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group> */}

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Address
          </Form.Label>
          <Col sm="10">
            <Form.Control
              readOnly={allowEdit}
              value={address}
              onClick={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              readOnly={allowEdit}
              value={email}
              onClick={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Contact
          </Form.Label>
          <Col sm="10">
            <Form.Control
              readOnly={allowEdit}
              value={contact}
              onClick={(e) => setContact(e.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
      {allowEdit ? (
        <Button
          variant="dark"
          size="sm"
          onClick={() => setAllowEdit(!allowEdit)}
          style={{
            marginTop: "20px",
            width: "fit-content",
            alignSelf: "center",
          }}
        >
          Edit
        </Button>
      ) : (
        <>
          <Button
            variant="dark"
            size="sm"
            onClick={() => setAllowEdit(!allowEdit)}
            style={{
              marginTop: "20px",
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            Close
          </Button>

          <Button
            variant="dark"
            size="sm"
            onClick={() => onSaveClick()}
            style={{
              marginTop: "20px",
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default ProfileDetails;
