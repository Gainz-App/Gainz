import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DrillCreator = () => {
  const { id } = useParams();
  const [drillData, setDrillData] = useState({});

  // TODO MAKE REAL API CALL OR LIFT STATE TO APP
  const getExercise = () => {
    setDrillData(
      {
        name: id, description: '???', type: '???', last_weight: '???', last_reps: '???', last_sets: '???',
      },
    );
  };

  useEffect(() => {
    console.log('Getting data from server for drill');
    getExercise();
  }, []);

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
    </div>

  );
};

export default DrillCreator;
