import React from "react";

import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

const NavBar = ({ user }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          {!user || user.dataType.subType === "DONOR" ? (
            <>
              <Navbar.Brand href="/">Donation Tracking</Navbar.Brand>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/solidarity_institutions">
                Solidarity Institutions
              </Nav.Link>
            </>
          ) : (
            ""
          )}

          {user ? (
            user.dataType.subType === "DONOR" ? (
              <>
                <Nav.Link href="/donations">My Donations</Nav.Link>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {user ? (
            user.dataType.subType === "MIS" ? (
              <>
                <Navbar.Brand href="/mis">Donation Tracking</Navbar.Brand>
                <Nav.Link href="/mis">Events</Nav.Link>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {user ? (
            user.dataType.subType === "BENEF" ? (
              <>
                <Navbar.Brand href="/benef">Donation Tracking</Navbar.Brand>
                <Nav.Link href="/benef">Benefits</Nav.Link>
              </>
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

          {user ? (
            user.dataType.subType === "ADMIN" ? (
              <>
                <Navbar.Brand href="/admin">Donation Tracking</Navbar.Brand>
                <Nav.Link href="/invoices">Invoices</Nav.Link>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {user ? (
            user.dataType.subType === "SUPPLCO" ? (
              <>
                <Navbar.Brand href="/supplco">Donation Tracking</Navbar.Brand>
                <Nav.Link href="/supplco">Invoices</Nav.Link>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {!user ? (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          ) : (
            ""
          )}
          {user ? <Nav.Link href="/logout">Logout</Nav.Link> : ""}
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
