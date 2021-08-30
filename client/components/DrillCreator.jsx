import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DrillCreator = () => {
  const { id } = useParams();
  const [drillData, setDrillData] = useState({});
  const [formVals, setFormVals] = useState({
    // weight, sets, reps, rest
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
    setDrillData(
      // How to we enter type_id here? The type should just be type, selected from the types table.Then I suppose we have to give the type_id the correct number based on user input
      // How do we use the id? Don't they need to put it in somewhere? 
      {
        name: id, description: 'super tough', type: 'legs', init_weight: 300, init_reps: 10, init_sets: 3,
      },
    );
  };

  useEffect(() => {
    console.log('Getting data from server for drill');
    getExercise();
  }, []);

  const createDrill = () => {
    console.log('trying to create new drill', formVals);
    // NEED TO DO ACTUAL API FETCH (METHOD POST) AT THIS POINT
  };

  const { weight, sets, reps, rest_interval } = formVals;

  return (
    <div className='drill'>
      <h1>Create a new drill:</h1>
      <li>
        <ul>{drillData.name}</ul>
        <ul>{drillData.description}</ul>
        <ul>{drillData.type}</ul>
        <ul>{drillData.last_weight}</ul>
        <ul>{drillData.last_reps}</ul>
        <ul>{drillData.last_sets}</ul>
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
