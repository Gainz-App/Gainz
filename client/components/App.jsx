import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Import React Components
import Nav from './Nav.jsx';
import ExercisesDisplay from './ExercisesDisplay.jsx';
import ExerciseCreator from './ExerciseCreator.jsx';
import DrillCreator from './DrillCreator.jsx';
import HistoryDisplay from './HistoryDisplay.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

// App Component
const App = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  return (
    <div className="App">
      <Nav userInfo={userInfo} />

      {/* React Router Switches */}
      <Switch>
        <Route path="/drill/:id">
          <DrillCreator />
        </Route>
        <Route path="/history">
          <HistoryDisplay />
        </Route>
        <Route path="/ExerciseCreator">
          <ExerciseCreator />
        </Route>
        <Route path="/login">
          <Login setUserInfo={setUserInfo} />
        </Route>
        <Route path="/logout">
          <h1>LOGOUT PAGE</h1>
        </Route>
        <Route path="/signup">
          <Signup setUserInfo={setUserInfo} />
        </Route>
        <Route path="/">
          <ExercisesDisplay />
        </Route>

      </Switch>

    </div>
  );
};

export default App;
