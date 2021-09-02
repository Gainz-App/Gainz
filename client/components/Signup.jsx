import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// React component to render signup form and send form data to server
const Signup = ({ setUserInfo }) => {
  const [formVals, setFormVals] = useState({ email: '', name: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Helper function to update state formVals on form change
  const updateFormVal = (key, val) => {
    setFormVals({ ...formVals, [key]: val });
  };

  // Function to submit signup form data to server, create new account
  const signup = () => {
    console.log('signing up!', formVals);
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formVals),
    })
      .then((response) => {
        // If signup successful, login
        console.log('SIGNUP RESPONSE: ', response.status);
        if (response.status === 201 || 400) {
          return response.json();
        }
        throw new Error('Error when trying to create new user!');
      })
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
          return;
        }
        setUserInfo(data);
        setLoggedIn(true);
      })
      .catch((err) => console.error(err));
  };

  const { email, name, password } = formVals;

  // If signed up correctly, redirect to main page
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  // If not logged in render signup form
  if (!loggedIn) {
    return (
      <section id="signupContainer" className="centeredContainer">
        <img id="logo" src="../assets/GAINZ_logo.png"></img>
        <h1 id="createNewText">Create a new user:</h1>
        <Form
          autoComplete="off"
          id="signupForm"
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}>
          <Form.Group className="newUserEmail" controlId="newUserEmail" autoComplete="off">
            <FloatingLabel
              autoComplete="off"
              controlId="floatingEmail"
              label="Email address"
              className="floatEmail"
              >
            <Form.Control
              autoComplete="off"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                console.log('Updated state: ', e.target.value);
                updateFormVal('email', e.target.value);
              }} />
              </FloatingLabel>
            
          </Form.Group>

          <Form.Group className="newUserName" controlId="newUserName">
            <FloatingLabel
              controlId="floatingName"
              label="Display name"
              className="floatName"
              >
            <Form.Control
              autocomplete="off"
              type="name"
              placeholder="name"
              onChange={(e) => {
                console.log('Updated state: ', e.target.value);
                updateFormVal('name', e.target.value);
              }}
              value={name}
              required />
              </FloatingLabel>
          </Form.Group>

          <Form.Group className="newUserPassword" controlId="newUserPassword">
            <FloatingLabel
              controlId="floatingPass"
              label="Password"
              className="floatPass"
              >
            <Form.Control
              autocomplete="off"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                console.log('Updated state: ', e.target.value);
                updateFormVal('password', e.target.value);
              }}
              value={password}
              required />
              </FloatingLabel>
          </Form.Group>

          <Button
            className="loginButtonId"
            variant="primary"
            type="submit">
            Sign Up
          </Button>
        </Form>
        {errorMessage ? (
          <p>
            Error:
            {` ${errorMessage}`}
          </p>
        )
          : null}
        <p id="already">
          Already Have an Acccount? 
        </p>
        
        <Link className="link" to="/login">
          <Button className="loginButtonId">
            Log In
          </Button>
        </Link>
        
      </section>
    );
  }
};

export default Signup;
