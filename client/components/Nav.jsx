import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const userNav = ({ userInfo }) => {
  console.log('this is the navbar speaking', userInfo);

  // Navbar when not signed in:
  if (!userInfo.name) {
    return (
           <section>
            <Nav variant="pills" defaultActiveKey="/login">

            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="/signup">Sign up</Nav.Link>
            </Nav.Item>
            </Nav>
            </section>

    );
  }

  // Signed in Navbar:
  return (
    <section>
    <Nav variant="pills" defaultActiveKey="/home">
  <Nav.Item>
    <Nav.Link href="/home">Home</Nav.Link>
  </Nav.Item>

  <Nav.Item>
    <Nav.Link eventKey="/ExerciseCreator">Create new exercise</Nav.Link>
  </Nav.Item>

  <Nav.Item>
    <Nav.Link eventKey="/history">History</Nav.Link>
  </Nav.Item>
  
  <Nav.Item>
    <Nav.Link eventKey="/logout">Logout</Nav.Link>
  </Nav.Item>
</Nav>
</section>
  );
};

export default userNav;

