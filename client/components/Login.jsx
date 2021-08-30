import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// React element to render login form and submit login to server
const Login = () => {
  const [formVals, setFormVals] = useState({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  // Helper function to update state formVals on form change
  const updateFormVal = (key, val) => {
    setFormVals({ ...formVals, [key]: val });
  };

  // Function to submit signup form data to server, create new account
  const login = () => {
    console.log('logging in!', formVals);

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formVals),
    })
      .then((response) => {
        // If login successful, set state for redirect
        console.log('LOGIN RESPONSE: ', response.status);
        if (response.status === 200) {
          setLoggedIn(true);
          return;
        }
        throw new Error('Error when trying to login a user!');
      })
      .catch((err) => console.error(err));
  };

  const { email, password } = formVals;

  // If signed up correctly, redirect to main page
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  // If not logged in render login form
  if (!loggedIn) {
    return (
      <section>
        <h3>Login to WobbeGainz:</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          {/* EMAIL INPUT */}
          <label htmlFor="userEmail">Email Address:</label>
          <input
            id="userEmail"
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
              console.log('Updated state: ', e.target.value);
              updateFormVal('email', e.target.value);
            }}
            value={email}
            name="email"
            required
          />

          {/* PASSWORD INPUT */}
          <label htmlFor="userPassword">Password:</label>
          <input
            id="userPassword"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              console.log('Updated state: ', e.target.value);
              updateFormVal('password', e.target.value);
            }}
            value={password}
            name="password"
            required
          />

          <button type="submit">Log In</button>
        </form>
      </section>
    );
  }
};

export default Login;
