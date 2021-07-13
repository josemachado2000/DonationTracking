import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Donate = ({ event, onDonateSuccess, onDonate }) => {
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState(0);
  const [donateClick, setDonateClick] = useState("");
  const [user] = useState(JSON.parse(localStorage.getItem("loggedUser")));

  const onClickDonate = () => {
    if (showDonate === false) {
      setShowDonate(true);
      return;
    } else {
      const date = new Date();
      const dateformatted =
        [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
        " " +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");
      if (amount === 0) {
        alert("Select donation value");
      } else {
        createDonation(amount, dateformatted);
      }
    }
  };

  const alert = (showAlert) => {
    onDonateSuccess(showAlert);
  };

  const createDonation = async (amount, date) => {
    var newDonation = "";
    if (user) {
      newDonation = {
        amount: amount,
        date: date,
        eventId: event.id,
        donorId: user.id,
      };
    } else {
      newDonation = {
        amount: amount,
        date: date,
        eventId: event.id,
      };
    }

    const newEventDonate = {
      id: uuidv4(),
      oldId: event.id,
      name: event.name,
      description: event.description,
      targetReason: event.targetReason,
      targetAmount: event.targetAmount,
      currentAmount: event.currentAmount + amount,
      beginDate: event.beginDate,
      endDate: event.endDate,
      isEnabled: 1,
      misId: event.misId,
      solInstId: event.solInstId,
      benefId: event.benefId,
      supplCo: event.supplCo,
    };

    try {
      onDonate(newDonation, newEventDonate);

      setDonateClick("");
      setAmount(0);
      setShowDonate(false);
      alert(true);
      setTimeout(function () {
        alert(false);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCloseDonate = () => {
    setDonateClick("");
    setAmount(0);
    setShowDonate(false);
  };

  const onValueClick = (value) => {
    setDonateClick("");
    setAmount(0);
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
                  onClick={() => onValueClick(1)}
                >
                  1 €
                </div>

                <div
                  className={
                    donateClick === "div_5€"
                      ? "donateValueClicked"
                      : "donateValue"
                  }
                  onClick={() => onValueClick(5)}
                >
                  5 €
                </div>

                <div
                  className={
                    donateClick === "div_10€"
                      ? "donateValueClicked"
                      : "donateValue"
                  }
                  onClick={() => onValueClick(10)}
                >
                  10 €
                </div>

                <div
                  className={
                    donateClick === "div_50€"
                      ? "donateValueClicked"
                      : "donateValue"
                  }
                  onClick={() => onValueClick(50)}
                >
                  50 €
                </div>

                <div style={{ display: "flex" }}>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    onChange={(e) => onValueClick(parseInt(e.target.value))}
                    style={{ width: "40%" }}
                  />
                  <InputGroup.Text style={{ width: "15%" }}>€</InputGroup.Text>
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
