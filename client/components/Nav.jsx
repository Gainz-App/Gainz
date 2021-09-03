import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const UserNav = ({ userInfo }) => {
  console.log('this is the navbar speaking', userInfo);

  // Navbar when not signed in:
  if (!userInfo.name) {
    return (
      <div>
        {/* <Nav variant="pills" defaultActiveKey="/login">
          <Nav.Item>
            <Nav.Link as={Link} to="/login" href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/signup" eventKey="/signup" href="/signup">Sign up</Nav.Link>
          </Nav.Item>
        </Nav> */}
      </div>
    );
  }

  // Signed in Navbar:
  return (
    <section id="navbar">
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home" as={Link} to="/home" href="/home">Home</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="/ExerciseCreator" as={Link} to="/ExerciseCreator" href="/ExerciseCreator">Create Exercise</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="/history" as={Link} to="/history" href="/history">History</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="/logout" as={Link} to="/logout" href="/logout">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </section>
  );
};

export default UserNav;