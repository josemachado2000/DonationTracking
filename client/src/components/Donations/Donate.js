import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Donate = () => {
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [donateClick, setDonateClick] = useState("");
  console.log(amount);

  const onClickDonate = () => {
    if (showDonate === false) {
      setShowDonate(true);
      return;
    } else {
      alert("DONATE");
    }
  };

  const onClickCloseDonate = () => {
    setShowDonate(false);
  };

  const onDonateClick = (value) => {
    if (!donateClick) {
      switch (value) {
        case 1:
          setDonateClick("div_1€");
          break;
        case 5:
          setDonateClick("div_5€");
          break;
        case 10:
          setDonateClick("div_10€");
          break;
        case 50:
          setDonateClick("div_50€");
          break;
        default:
          setDonateClick("");
      }
      setAmount(value);
    } else {
      setDonateClick("");
      setAmount(0.0);
    }
  };

  return (
    <>
      {showDonate ? (
        <div className="donateSection">
          <div className="buttonDonate">
            <Button
              variant="dark"
              size="sm"
              onClick={(e) => onClickCloseDonate(e)}
              style={{ color: "white", float: "right" }}
            >
              CLOSE
              <FontAwesomeIcon
                icon={faChevronUp}
                size="lg"
                style={{ marginLeft: "10px" }}
              />
            </Button>
          </div>
          <Form style={{ marginTop: "20px" }}>
            <Form.Group as={Row}>
              <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
                Amount
              </Form.Label>
              <Col sm="10" className="donateValues">
                <div
                  className={
                    donateClick === "div_1€"
                      ? "donateValueClicked"
                      : "donateValue"
                  }
                  onClick={() => onDonateClick(1)}
                >
                  1 €
                </div>
                <div
                  className={
                    donateClick === "div_5€"
                      ? "donateValueClicked"
                      : "donateValue"
                  }
                  onClick={() => onDonateClick(5)}
                >
                  5 €
                </div>
                <div
                  className={
                    donateClick === "div_10€"
                      ? "donateValueClicked"
                      : "donateValue"
                  }
                  onClick={() => onDonateClick(10)}
                >
                  10 €
                </div>
                <div
                  className={
                    donateClick === "div_50€"
                      ? "donateValueClicked"
                      : "donateValue"
                  }
                  onClick={() => onDonateClick(50)}
                >
                  50 €
                </div>
                <div>
                  Other value
                  <Form.Control
                    type="number"
                    placeholder="0"
                    onChange={(e) => onDonateClick(e.target.value)}
                  />
                  <InputGroup.Text>€</InputGroup.Text>
                </div>
              </Col>
            </Form.Group>
          </Form>
          <Button
            variant="dark"
            size="sm"
            onClick={() => onClickDonate()}
            style={{
              marginTop: "20px",
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            DONATE
          </Button>
        </div>
      ) : (
        <div className="buttonDonate">
          <Button
            variant="dark"
            size="sm"
            onClick={() => onClickDonate()}
            style={{ color: "white" }}
          >
            DONATE
            <FontAwesomeIcon
              icon={faChevronDown}
              size="lg"
              style={{ marginLeft: "10px" }}
            />
          </Button>
        </div>
      )}
    </>
  );
};

export default Donate;
