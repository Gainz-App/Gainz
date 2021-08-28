import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  console.log('this is the navbar speaking');

  return (
    <nav>
      NavBar
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/createExercise">Create Exercise</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
