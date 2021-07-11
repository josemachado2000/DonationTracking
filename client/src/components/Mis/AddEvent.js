import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const AddEvent = ({ onAddEvent }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetReason, setTargetReason] = useState("");
  const [targetAmount, setTargetAmount] = useState(0.0);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [benefs, setBenefs] = useState([]);
  const [benefId, setBenefId] = useState("");
  const [benefDropdownTitle, setBenefDropdownTitle] = useState(
    "Select a Beneficiary"
  );

  useEffect(() => {
    const getBenefs = async () => {
      const benefs = await fetchBenefs();
      setBenefs(benefs);
    };
    getBenefs();
  }, []);

  const fetchBenefs = async () => {
    const response = await axios.get("http://localhost:8080/get_all_BENEFS");
    return response.data;
  };

  const addEvent = () => {
    if (
      !name ||
      !description ||
      !targetReason ||
      !targetAmount ||
      !beginDate ||
      !endDate ||
      !benefId
    ) {
      alert("Empty fields!");
      return;
    }

    onAddEvent({
      name,
      description,
      targetReason,
      targetAmount,
      beginDate,
      endDate,
      benefId,
    });

    setName("");
    setDescription("");
    setTargetReason("");
    setTargetAmount("");
    setBeginDate("");
    setEndDate("");
    setBenefId("");
  };

  const createBeneficiary = () => {};

  return (
    <div className="addEvent_page">
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{ marginTop: "10px" }}>
          <Form.Label column sm="2" style={{ fontWeight: "bold" }}>
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Target Reason
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={targetReason}
                onChange={(e) => setTargetReason(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Target Amount
            </Form.Label>
            <Col sm="10" style={{ display: "flex" }}>
              <Form.Control
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
              <InputGroup.Text style={{ width: "8%" }}>€</InputGroup.Text>
            </Col>
          </Form.Group>
        </Form.Group>

        <DropdownButton title={benefDropdownTitle}>
          {benefs.length === 0 ? (
            <Dropdown.Item onClick={() => createBeneficiary()}>
              Add Beneficiary
            </Dropdown.Item>
          ) : (
            <>
              {benefs.map((benef) => (
                <Dropdown.Item
                  key={benef.id}
                  as="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setBenefDropdownTitle(benef.name);
                    setBenefId(benef.id);
                  }}
                >
                  {benef}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => createBeneficiary()}>
                Add Beneficiary
              </Dropdown.Item>
            </>
          )}
        </DropdownButton>
        <Form.Group as={Row}>
          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              Begin Date
            </Form.Label>
            <Col sm="10">
              <DatePicker
                todayButton="Today"
                dateFormat="dd/MM/yyyy"
                selected={beginDate}
                onChange={(date) => setBeginDate(date)}
                selectsStart
                startDate={beginDate}
                endDate={endDate}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Col} style={{ padding: "0px" }}>
            <Form.Label column sm="10" style={{ fontWeight: "bold" }}>
              End Date
            </Form.Label>
            <Col sm="10">
              <DatePicker
                todayButton="Today"
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={beginDate}
                endDate={endDate}
                minDate={beginDate}
              />
            </Col>
          </Form.Group>
        </Form.Group>
      </Form>

      <>
        <div>
          <Link to="/mis/events" className="btn btn-primary cancel">
            Cancel
          </Link>
          <div>
            <Link
              to="/mis/events"
              className="btn btn-primary add"
              onClick={addEvent}
            >
              Add
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default AddEvent;
