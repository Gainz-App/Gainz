import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DrillCreator = () => {
  const { id } = useParams();
  const [drillData, setDrillData] = useState({});

  // TODO MAKE REAL API CALL OR LIFT STATE TO APP
  //Is there a route for creating a drill? I only see createExercise
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

  const handleSubmitClick = () => {
    // click submit, drillData goes to DB, return to root
  };

  const handleCancelClick = () => {
    // return to root
  };

  return (
    <div className='drill'>
      <h1>This is the DRILL CREATOR FOR {id}</h1>
      <li>
        <ul>{drillData.name}</ul>
        <ul>{drillData.description}</ul>
        <ul>{drillData.type}</ul>
        <ul>{drillData.last_weight}</ul>
        <ul>{drillData.last_reps}</ul>
        <ul>{drillData.last_sets}</ul>
      </li>
      <form>
        <p>Enter Today's Weight:</p>
        <input 
          type="text"
          name="weight"
          value=""
         />
        <p>Enter Today's Sets:</p>
        <input type="text" name="sets" value="" />
        <p>Enter Today's Reps</p>
        <input type="text" name="reps" value="" />
        <p>Enter Today's Rest</p>
        <input type="text" name="rest" value="" />
        <button onClick={handleSubmitClick}>Submit< /button>
        <button onClick={handleCancelClick}>Cancel< /button>
      </form>
    </div>

  );
};

export default DrillCreator;
