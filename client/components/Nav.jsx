import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ userInfo }) => {
  console.log('this is the navbar speaking', userInfo);

  return (
    <nav>
      NavBar
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ExerciseCreator">Create Exercise</Link>
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
        <li>
          {userInfo.name
            ? (
              <h4>
                Logged in as:
                {userInfo.name}
                -
                {userInfo.email}
              </h4>
            )
            : (<h4>Not logged in!</h4>)}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
