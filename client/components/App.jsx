import React from 'react';
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
  console.log('THIS IS THE APP');

  return (
    <div className="App">
      <Nav />

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
          <Login />
        </Route>
        <Route path="/logout">
          <h1>LOGOUT PAGE</h1>
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <ExercisesDisplay />
        </Route>

      </Switch>

    </div>
  );
};

export default App;
