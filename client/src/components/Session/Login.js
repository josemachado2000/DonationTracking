import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onLoginClick = async () => {
    const credentials = { username: username, password: password };
    if (!username || !password) {
      alert("Empty fields!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/get_LOGIN",
          credentials
        );

        console.log(response);
        if (response.data.length === 0) {
          alert("User doesnt exist!");
        } else {
          localStorage.setItem("loggedUser", JSON.stringify(response.data[0]));

          switch (response.data[0].dataType.subType) {
            case "MIS":
              history.push("/mis");
              history.go(0);
              break;
            case "DONOR":
              history.push("/events");
              history.go(0);
              break;
            case "BENEF":
              history.push("/benef");
              history.go(0);
              break;
            case "ADMIN":
              history.push("/admin");
              history.go(0);
              break;
            case "SUPPLCO":
              history.push("/supplco");
              history.go(0);
            default:
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <h3>Login</h3>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>
      <Button
        variant="dark"
        size="sm"
        onClick={() => onLoginClick()}
        style={{
          marginTop: "20px",
          width: "fit-content",
          alignSelf: "center",
        }}
      >
        LOGIN
      </Button>
    </>
  );
};

export default Login;
