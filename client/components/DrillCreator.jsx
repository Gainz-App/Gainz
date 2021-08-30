import React, { useState, useEffect } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';

const DrillCreator = () => {
  const { id } = useParams();
  const [drillData, setDrillData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [formVals, setFormVals] = useState({
    exercise_id: id,
    weight: '',
    sets: '',
    reps: '',
    rest_interval: '',
  });

  // Helper function to update state formVals on form change
  const updateFormVal = (key, val) => {
    setFormVals({ ...formVals, [key]: val });
  };

  // TODO MAKE REAL API CALL OR LIFT STATE TO APP
  // Is there a route for creating a drill? I only see createExercise
  const getExercise = () => {
    fetch(`/api/exercise/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } 
        throw new Error('Error when trying to get exercise details');
      })
      .then((data) => {
        console.log('exercise drill data is', data);
        setDrillData(data);
      })
      .catch((error) => console.error(error));
  };

  // Get exercise data for drill info (CURRENTLY FAKE DATA)
  useEffect(() => {
    console.log('Getting data from server for drill');
    getExercise();
  }, []);

  // Function to submit drill form data to server, create new drill
  const createDrill = () => {
    console.log('trying to create new drill', formVals);

    fetch('/api/drill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formVals),
    })
      .then((response) => {
        console.log('drill create response', response.status);
        if (response.status === 201) {
          return response.json();
        }
        throw new Error('error when trying to create a drill');
      })
      .then((data) => {
        console.log('response is 201, data is', data);
        setRedirect(true);
      })
      .catch((error) => console.error(error));
  };

  const { weight, sets, reps, rest_interval } = formVals;

  // Redirect to home page if drill created successfully
  if (redirect === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="drill">
      <h1>Create a new drill:</h1>
      <li>
        <ul>Exercise Name:{drillData.name}</ul>
        <ul>Exercise Description:{drillData.description}</ul>
        <ul>Exercise Type:{drillData.type}</ul>
        <ul>Last Weight (LBs):{drillData.last_weight}</ul>
        <ul>Last Reps:{drillData.last_reps}</ul>
        <ul>Last Sets:{drillData.last_sets}</ul>
        <ul>Last Rest (Mins):{drillData.last_rest}</ul>
      </li>

      {/* DRILL INPUT FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createDrill();
        }}
      >

        {/* DRILL WEIGHT INPUT */}
        <label htmlFor="drillWeight">
          Today&apos;s Weight (LBs):
          <input
            id="drillWeight"
            type="number"
            name="weight"
            value={weight}
            onChange={(e) => {
              console.log('Updated formVals in DrillCreator: ', e.target.value);
              updateFormVal('weight', e.target.value);
            }}
            min={1}
            required
          />
        </label>
        <br />

        {/* DRILL SETS INPUT */}
        <label htmlFor="drillSets">
          Today&apos;s Sets:
          <input
            id="drillSets"
            type="number"
            name="sets"
            value={sets}
            onChange={(e) => {
              console.log('updated formVals in DrillCreator', e.target.value);
              updateFormVal('sets', e.target.value);
            }}
            min={1}
            required
          />
        </label>
        <br />

        {/* DRILL REPS INPUT */}
        <label htmlFor="drillReps">
          Today&apos;s Reps:
          <input
            id="drillReps"
            type="number"
            name="reps"
            value={reps}
            onChange={(e) => {
              console.log('updated formVals in DrillCreator', e.target.value);
              updateFormVal('reps', e.target.value);
            }}
            min={1}
            required
          />
        </label>
        <br />

        {/*DRILL REST INPUT */}
        <label htmlFor="drillRest">
          Today&apos;s Rest Time (Mins):
          <input
            id="drillRest"
            type="number"
            name="rest"
            value={rest_interval}
            onChange={(e) => {
              console.log('updated formVals in DrillCreator', e.target.value);
              updateFormVal('rest_interval', e.target.value);
            }}
            min={1}
            required
          />
        </label>
        <br />

        {/* FORM SUBMIT BUTTON */}
        <button
          type="submit"
        >
          Submit
        </button>

        {/* FORM CANCEL BUTTON */}
        <Link to="/">
          <button
            type="button"
          >
            Cancel
          </button>
        </Link>

      </form>
    </div>
  );
};

export default DrillCreator;
