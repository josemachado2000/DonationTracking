import React from "react";

import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

const NavBar = ({ user }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Donation Tracking</Navbar.Brand>
        <Nav className="mr-auto">
          {!user || user.dataType.subType === "DONOR" ? (
            <>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/solidarity_institutions">
                Solidarity Institutions
              </Nav.Link>
            </>
          ) : (
            ""
          )}

          {user ? (
            user.dataType.subType === "MIS" ? (
              <Nav.Link href="/mis/events">Events</Nav.Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {user ? (
            user.dataType.subType === "BENEF" ? (
              <Nav.Link href="/benef">Benefits</Nav.Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {user ? (
            user.dataType.subType === "MIS" ||
            user.dataType.subType === "DONOR" ? (
              <Nav.Link href="/profile">Profile</Nav.Link>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {!user ? <Nav.Link href="/login">Login</Nav.Link> : ""}
          {user ? <Nav.Link href="/logout">Logout</Nav.Link> : ""}
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
