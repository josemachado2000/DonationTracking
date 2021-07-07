import React from "react";

import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Donation Tracking</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="/solidarity_institutions">
            Solidarity Institutions
          </Nav.Link>
          <Nav.Link href="/mis/events">
            Member of Institution of Solidarity
          </Nav.Link>
          <Nav.Link href="/benefits">Benefits</Nav.Link>
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          <Nav.Link href="/profile">
            Profile
          </Nav.Link>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form> */}
      </Navbar>
    </>
  );
};

export default NavBar;
