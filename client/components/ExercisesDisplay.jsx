import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExercisesDisplay = () => {
  const [exerciseData, setExerciseData] = useState([]);

  // TODO MAKE REAL API CALL
  // const getExercises = () => {
  //   setExerciseData([
  //     { name: 'bench-press', description: 'benching', type: 'chest' },
  //     { name: 'overhead-press', description: 'pressing', type: 'shoulder' }]);
  // };

  useEffect(() => {
    console.log('Getting data from server');
    // getExercises();
    fetch('/api/')
      .then((res) => res.json())
      .then((exercises) => {
        console.log('exercises are', exercises);
        setExerciseData(exercises);
      })
      .catch((error) => {
        console.log('error on ExercisesDisplay', error);
      });
  }, []);

  return (
    <div>
      <h1>Pick an Exercise:</h1>
      {exerciseData.map((exercise, i) => {
        console.log('makes all data exercises');
        return (
          <div key={exercise.name} className="exercise">
            <h2>{exercise.name}</h2>
            <h3>{exercise.type}</h3>
            <h3>{exercise.description}</h3>
            <Link to={`/drill/${exercise.name}`}>
              <button>Start Drill</button>
            </Link>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ExercisesDisplay;
