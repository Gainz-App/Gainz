import React, { useState } from 'react';

// React element to render singup form and submit signup to server
const Login = () => {
  const [formVals, setFormVals] = useState({ email: '', name: '', password: '' });

  // Helper function to update state formVals on form change
  const updateFormVal = (key, val) => {
    setFormVals({ ...formVals, [key]: val });
  };

  // Function to submit signup form data to server, create new account
  const signup = () => {
    // TO DO
    console.log('signing up!', formVals);
  };

  const { email, name, password } = formVals;

  return (
    <section>
      <h3>Signup to WobbeGainz:</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}
      >
        {/* EMAIL INPUT */}
        <label htmlFor="newUserEmail">Email Address:</label>
        <input
          id="newUserEmail"
          type="email"
          placeholder="Email Address"
          onChange={(e) => {
            console.log('Updated state: ', e.target.value);
            updateFormVal('email', e.target.value);
          }}
          name="email"
          required
        />

        {/* NAME INPUT */}
        <label htmlFor="newUserName">Display Name:</label>
        <input
          id="newUserName"
          type="text"
          placeholder="Display Name"
          onChange={(e) => {
            console.log('Updated state: ', e.target.value);
            updateFormVal('name', e.target.value);
          }}
          name="display name"
          required
        />

        {/* PASSWORD INPUT */}
        <label htmlFor="newUserPassword">Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            console.log('Updated state: ', e.target.value);
            updateFormVal('password', e.target.value);
          }}
          name="password"
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default Login;
